import { formatCurrency } from '../../../../utilities/Helper';
import { getReconciliationReportTemplate } from './ReconiliationReportTemplate';

// Type definitions
interface MainDataItem {
  s_ItemDescription: string;
  n_Amount: number | null;
  s_UnderLine: string;
}

interface TransactionItem {
  Transaction_ID: string;
  Transaction_Date: string;
  Memo: string;
  Credit?: number;
  Debit?: number;
}

interface ReportData {
  companyName: string;
  p_AsofDate: string;
  mainData: MainDataItem[];
  subReportReconcile: TransactionItem[]; // Cleared Transactions
  clearedDeposit: TransactionItem[];
  unclearedPayment: TransactionItem[]; // NEW
  unclearedDeposit: TransactionItem[]; // NEW
}

export class PrintableReportGenerator {
  private reportData: ReportData;

  constructor(reportData: ReportData) {
    this.reportData = reportData;
  }

  generatePrintableHTML(): string {
    if (!this.reportData) return '';

    const formattedDate = this.formatDate(this.reportData.p_AsofDate);
    const summaryContent = this.generateSummaryItems();
    const clearedTransactionContent =
      this.generateClearedTransactionRows() +
      this.generateClearedTransactionTotal();
    const clearedDepositContent =
      this.generateClearedDepositRows() + this.generateClearedDepositTotal();
    const unclearedPaymentContent =
      this.generateUnclearedPaymentRows() +
      this.generateUnclearedPaymentTotal();
    const unclearedDepositContent =
      this.generateUnclearedDepositRows() +
      this.generateUnclearedDepositTotal();

    return getReconciliationReportTemplate(
      this.reportData.companyName,
      formattedDate,
      summaryContent,
      clearedTransactionContent,
      clearedDepositContent,
      unclearedPaymentContent,
      unclearedDepositContent
    );
  }

  private generateSummaryItems(): string {
    if (!this.reportData?.mainData) return '';

    return this.reportData.mainData
      .slice(0, 12)
      .map((item, idx) => {
        const isIndented = !(idx === 0 || idx === 7);
        const isDateLine = idx === 8;
        const underline = item?.s_UnderLine === 'Y';

        const label = isDateLine
          ? `${item?.s_ItemDescription} (${this.formatDate(
              this.reportData?.p_AsofDate
            )})`
          : item?.s_ItemDescription;

        const cssClasses = [
          'summary-item',
          isIndented ? 'indented' : '',
          underline ? 'underlined' : '',
        ]
          .filter(Boolean)
          .join(' ');

        const amountDisplay =
          item?.n_Amount != null ? formatCurrency(item.n_Amount) : '';

        return `
        <div class="${cssClasses}">
          <span>${label}</span>
          <span class="amount">${amountDisplay}</span>
        </div>
      `;
      })
      .join('');
  }

  // ---------------------------
  // Cleared Transactions
  // ---------------------------
  private generateClearedTransactionRows(): string {
    if (!this.reportData?.subReportReconcile) return '';

    return this.reportData.subReportReconcile
      .map(
        item => `
      <tr>
        <td>${item.Transaction_ID || ''}</td>
        <td>${item.Transaction_Date || ''}</td>
        <td>${item.Memo || ''}</td>
        <td class="text-right">${formatCurrency(item.Credit || 0)}</td>
      </tr>
    `
      )
      .join('');
  }

  private generateClearedTransactionTotal(): string {
    if (
      !this.reportData?.subReportReconcile ||
      this.reportData.subReportReconcile.length === 0
    ) {
      return '';
    }

    const total = this.reportData.subReportReconcile.reduce(
      (sum, val) => sum + parseFloat(String(val.Credit || 0)),
      0
    );

    return `
      <tr class="total-row">
        <td colspan="3"><b>Total Cleared Checks and Payments</b></td>
        <td class="text-right"><b>${formatCurrency(total)}</b></td>
      </tr>
    `;
  }

  // ---------------------------
  // Cleared Deposits
  // ---------------------------
  private generateClearedDepositRows(): string {
    if (!this.reportData?.clearedDeposit) return '';

    return this.reportData.clearedDeposit
      .map(
        item => `
      <tr>
        <td>${item.Transaction_ID || ''}</td>
        <td>${item.Transaction_Date || ''}</td>
        <td>${item.Memo || ''}</td>
        <td class="text-right">${formatCurrency(item.Debit || 0)}</td>
      </tr>
    `
      )
      .join('');
  }

  private generateClearedDepositTotal(): string {
    if (
      !this.reportData?.clearedDeposit ||
      this.reportData.clearedDeposit.length === 0
    ) {
      return '';
    }

    const total = this.reportData.clearedDeposit.reduce(
      (sum, val) => sum + parseFloat(String(val.Debit || 0)),
      0
    );

    return `
      <tr class="total-row">
        <td colspan="3"><b>Total Cleared Deposits</b></td>
        <td class="text-right"><b>${formatCurrency(total)}</b></td>
      </tr>
    `;
  }

  // ---------------------------
  // Uncleared Transactions (NEW)
  // ---------------------------
  private generateUnclearedPaymentRows(): string {
    if (!this.reportData?.unclearedPayment) return '';

    return this.reportData.unclearedPayment
      .map(
        item => `
      <tr>
        <td>${item.Transaction_ID || ''}</td>
        <td>${item.Transaction_Date || ''}</td>
        <td>${item.Memo || ''}</td>
        <td class="text-right">${formatCurrency(item.Credit || 0)}</td>
      </tr>
    `
      )
      .join('');
  }

  private generateUnclearedPaymentTotal(): string {
    if (
      !this.reportData?.unclearedPayment ||
      this.reportData.unclearedPayment.length === 0
    ) {
      return '';
    }

    const total = this.reportData.unclearedPayment.reduce(
      (sum, val) => sum + parseFloat(String(val.Credit || 0)),
      0
    );

    return `
      <tr class="total-row">
        <td colspan="3"><b>Total Uncleared Checks and Payments</b></td>
        <td class="text-right"><b>${formatCurrency(total)}</b></td>
      </tr>
    `;
  }

  // ---------------------------
  // Uncleared Deposits (NEW)
  // ---------------------------
  private generateUnclearedDepositRows(): string {
    if (!this.reportData?.unclearedDeposit) return '';

    return this.reportData.unclearedDeposit
      .map(
        item => `
      <tr>
        <td>${item.Transaction_ID || ''}</td>
        <td>${item.Transaction_Date || ''}</td>
        <td>${item.Memo || ''}</td>
        <td class="text-right">${formatCurrency(item.Debit || 0)}</td>
      </tr>
    `
      )
      .join('');
  }

  private generateUnclearedDepositTotal(): string {
    if (
      !this.reportData?.unclearedDeposit ||
      this.reportData.unclearedDeposit.length === 0
    ) {
      return '';
    }

    const total = this.reportData.unclearedDeposit.reduce(
      (sum, val) => sum + parseFloat(String(val.Debit || 0)),
      0
    );

    return `
      <tr class="total-row">
        <td colspan="3"><b>Total Uncleared Deposits</b></td>
        <td class="text-right"><b>${formatCurrency(total)}</b></td>
      </tr>
    `;
  }

  private formatDate(date: string): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  handlePrint(): void {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(this.generatePrintableHTML());
      printWindow.document.close();
      printWindow.print();
    }
  }

  handleExportPDF(): void {
    const pdfWindow = window.open('', '_blank');
    if (pdfWindow) {
      pdfWindow.document.write(this.generatePrintableHTML());
      pdfWindow.document.close();

      setTimeout(() => {
        pdfWindow.print();
      }, 500);
    }
  }
}

// Export individual functions
export const generatePrintableHTML = (reportData: ReportData): string => {
  const generator = new PrintableReportGenerator(reportData);
  return generator.generatePrintableHTML();
};

export const handlePrint = (reportData: ReportData): void => {
  const generator = new PrintableReportGenerator(reportData);
  generator.handlePrint();
};

export const handleExportPDF = (reportData: ReportData): void => {
  const generator = new PrintableReportGenerator(reportData);
  generator.handleExportPDF();
};

export default PrintableReportGenerator;
