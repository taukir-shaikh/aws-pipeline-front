import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

export interface AddressComponent {
  types: string[];
  short_name: string;
}

export interface PropertyData {
  full_address: string;
  street_number: string;
  street_name: string;
  city: string;
  CountyName: string;
  PostalCode: string;
  country: string;
  latitude: string | null;
  longitude: string | null;
  zipPlus4: string;
  value: string;
  autocomplete: string;
  state: string;
  s_PostalCodeSuffix: string;
}

export async function getGeoCode(
  description: string,
  selectedPropertyData: PropertyData
) {
  return geocodeByAddress(description).then(addr => {
    const propData: PropertyData = { ...selectedPropertyData };
    addr &&
      addr[0] &&
      addr[0].address_components.forEach((e: AddressComponent) => {
        if (e.types.includes('postal_code')) {
          propData.PostalCode = e.short_name;
        } else if (e.types.includes('street_number')) {
          propData.street_number = e.short_name;
        } else if (e.types.includes('route')) {
          propData.street_name = e.short_name;
        } else if (
          e.types.includes('locality') &&
          e.types.includes('political')
        ) {
          propData.city = e.short_name;
        } else if (
          e.types.includes('country') &&
          e.types.includes('political')
        ) {
          propData.country = e.short_name;
        } else if (
          e.types.includes('administrative_area_level_2') &&
          e.types.includes('political')
        ) {
          propData.CountyName = e.short_name;
        } else if (
          e.types.includes('administrative_area_level_1') &&
          e.types.includes('political')
        ) {
          propData.state = e.short_name;
        } else if (e.types.includes('postal_code_suffix')) {
          propData.zipPlus4 = e.short_name;
          propData.s_PostalCodeSuffix = e.short_name;
        }
      });
    propData.autocomplete = addr[0] ? addr[0].formatted_address : '';
    if (addr && addr[0]) {
      getLatLng(addr[0]).then(({ lat, lng }) => {
        propData.latitude = lat.toFixed(7);
        propData.longitude = lng.toFixed(7);
      });
    }

    return propData;
  });
}
