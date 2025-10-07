// Type definitions for the template

export const getReconciliationReportTemplate = (
  companyName: string,
  reportDate: string,
  summaryContent: string,
  clearedTransactionContent: string,
  clearedDepositContent: string,
  unclearedPaymentContent: string,
  unclearedDepositContent: string
): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Reconciliation Report</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: white;
            padding: 40px 20px;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border: 3px solid #e2e8f0;
            border-radius: 8px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .company-name {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 8px;
            color: #2d3748;
          }
          .report-type {
            font-size: 14px;
            color: #718096;
            margin-bottom: 24px;
          }
          .reconcile-date {
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 32px;
            text-align: center;
          }
          .section {
            margin-bottom: 32px;
          }
          .summary-section {
            margin-bottom: 24px;
          }
          .section-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 16px;
            color: #2d3748;
          }
          .summary-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #f7fafc;
          }
          .summary-item.indented {
            padding-left: 20px;
          }
          .summary-item.underlined {
            border-bottom: 2px solid #2d3748;
          }
          .summary-item:last-child {
            border-bottom: none;
          }
          .amount {
            font-weight: bold;
          }
          .negative {
            color: #e53e3e;
          }
          .table-title {
            font-weight: 600;
            font-size: 18px;
            margin: 24px 0 12px 0;
            color: #2d3748;
            text-align: center;
          }
          .table-title.uncleared {
            color: #d69e2e;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 24px;
            font-size: 14px;
          }
          th {
            background-color: #f8f9fa;
            padding: 12px 8px;
            text-align: left;
            font-weight: 600;
            border: 1px solid #e2e8f0;
            color: #2d3748;
          }
          th.uncleared {
            background-color: #fef5e7;
            color: #b7791f;
          }
          td {
            padding: 12px 8px;
            border: 1px solid #e2e8f0;
            background-color: #fff;
          }
          tr:nth-child(even) td {
            background-color: #f8f9fa;
          }
          .uncleared-row td {
            background-color: #fefcf5;
          }
          .uncleared-row:nth-child(even) td {
            background-color: #fef5e7;
          }
          .text-right {
            text-align: right;
          }
          .text-center {
            text-align: center;
          }
          .total-row {
            font-weight: bold;
            background-color: #f8f9fa !important;
          }
          .total-row td {
            background-color: #f8f9fa !important;
          }
          @media print {
            body {
              padding: 20px;
            }
            .container {
              border: none;
              box-shadow: none;
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Company Header -->
          <div class="header">
            <div class="company-name">${companyName || 'Company Name'}</div>
            <div class="report-type">Reconciliation report</div>
          </div>
          
          <!-- Reconciliation Date -->
          <div class="reconcile-date">
            Reconciled on: ${reportDate}
          </div>

          <!-- Summary Section -->
          <div class="section summary-section">
            <div class="section-title">Summary</div>
            ${summaryContent}
          </div>

          <!-- Cleared Transaction Details -->
          <div class="section">
            <div class="table-title">Cleared Transaction Details</div>
            
            <table>
              <thead>
                <tr>
                  <th width="20%">Transaction Number</th>
                  <th width="20%">Transaction Date</th>
                  <th width="45%" class="text-center">Memo</th>
                  <th width="15%" class="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${clearedTransactionContent}
              </tbody>
            </table>
          </div>

          <!-- Cleared Deposit Details -->
          <div class="section">
            <div class="table-title">Cleared Deposit Details</div>
            
            <table>
              <thead>
                <tr>
                  <th width="20%">Transaction Number</th>
                  <th width="20%">Transaction Date</th>
                  <th width="45%" class="text-center">Memo</th>
                  <th width="15%" class="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${clearedDepositContent}
              </tbody>
            </table>
          </div>

          <!-- Uncleared Transaction Details -->
          <div class="section">
            <div class="table-title uncleared">Uncleared Transaction Details</div>
            
            <table>
              <thead>
                <tr>
                  <th width="20%" class="uncleared">Transaction Number</th>
                  <th width="20%" class="uncleared">Transaction Date</th>
                  <th width="45%" class="text-center uncleared">Memo</th>
                  <th width="15%" class="text-right uncleared">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${unclearedPaymentContent}
              </tbody>
            </table>
          </div>

          <!-- Uncleared Deposit Details -->
          <div class="section">
            <div class="table-title uncleared">Uncleared Deposit Details</div>
            
            <table>
              <thead>
                <tr>
                  <th width="20%" class="uncleared">Transaction Number</th>
                  <th width="20%" class="uncleared">Transaction Date</th>
                  <th width="45%" class="text-center uncleared">Memo</th>
                  <th width="15%" class="text-right uncleared">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${unclearedDepositContent}
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>
  `;
};

export default getReconciliationReportTemplate;
