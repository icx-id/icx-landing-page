import React from 'react';
import { Input } from '~/components/Core/Input';
import { KycFormContainer } from './KycFormContainer';
import { Select } from '~/components/core/Select';
import { useGetProvinces } from '../api/useGetProvinces';
import { useFormikContext } from 'formik';
import { KycFormProps } from '../types';
import { useGetCities } from '../api/useGetCities';
import { useGetDistricts } from '../api/useGetDistricts';
import { useGetSubDistricts } from '../api/useGetSubDistricts';
import { useGetPostalCodes } from '../api/useGetPostalCode';

interface KycFormAddressProps {
  onSubmit: () => void;
  goBack: () => void;
}

export const KycFormAddress: React.FC<KycFormAddressProps> = ({ onSubmit, goBack }) => {
  const { handleChange, values, setFieldValue } = useFormikContext<KycFormProps>();
  const { data: provinces } = useGetProvinces();
  const { data: cities } = useGetCities(values.provinceAddress);
  const { data: districts } = useGetDistricts(values.cityAddress);
  const { data: subDistricts } = useGetSubDistricts(values.districtAddress);
  const { data: postalCodes } = useGetPostalCodes(values.subDistrictAddress);

  const handleSubmit = () => {
    onSubmit();
    setFieldValue('domicileAddress', values.fullAddress);
    setFieldValue('domicileProvince', values.provinceAddress);
    setFieldValue('domicileTown', values.cityAddress);
    setFieldValue('domicileDistrict', values.districtAddress);
    setFieldValue('domicileSubdistrict', values.subDistrictAddress);
    setFieldValue('domicilePostalCode', values.postalCodeAddress);
  };

  return (
    <KycFormContainer
      withBreadcrumbs
      title="Silahkan isi alamat sesuai KTP"
      onSubmit={handleSubmit}
      goBack={goBack}
      currentStep="4"
      totalStep="5">
      <Input
        name="fullAddress"
        onChange={handleChange}
        value={values.fullAddress}
        label="Alamat Lengkap"
        type="text"
      />
      <Select
        label="Provinsi"
        value={values.provinceAddress}
        onChange={e => setFieldValue('provinceAddress', e)}
        searchable
        nothingFound="Provinsi tidak ditemukan"
        data={provinces?.map(province => province.provinceName) || []}
      />
      <Select
        label="Kota"
        value={values.cityAddress}
        onChange={e => setFieldValue('cityAddress', e)}
        searchable
        nothingFound="Kota tidak ditemukan"
        data={cities?.map(city => city.city) || []}
      />
      <Select
        label="Kecamatan"
        value={values.districtAddress}
        onChange={e => setFieldValue('districtAddress', e)}
        searchable
        nothingFound="Kecamatan tidak ditemukan"
        data={districts?.map(district => district.district) || []}
      />
      <Select
        label="Kelurahan"
        value={values.subDistrictAddress}
        onChange={e => setFieldValue('subDistrictAddress', e)}
        searchable
        nothingFound="Kelurahan tidak ditemukan"
        data={subDistricts?.map(subDistrict => subDistrict.subDistrict) || []}
      />
      <Select
        label="Kode Pos"
        value={values.postalCodeAddress}
        onChange={e => setFieldValue('postalCodeAddress', e)}
        searchable
        nothingFound="Kode Pos tidak ditemukan"
        data={postalCodes?.map(postalCode => postalCode.postalCode) || []}
      />
    </KycFormContainer>
  );
};
