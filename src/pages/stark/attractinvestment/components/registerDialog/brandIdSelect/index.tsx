import React, { useEffect, useState } from 'react'
import { Select, Form, AutoComplete, Input } from 'poizon-design'
import fetchBrandSearchService from '@/services/attractinvestment/fetch-hot-brand'
import type { FormInstance, SelectProps, FormItemProps } from 'poizon-design'
import { Datum } from '@/entities/attractinvestment/interface/fetch-hot-brand'

interface Props {
  item: SelectProps & FormItemProps
  form: FormInstance
  visible: boolean
  setBrandArr: (val: Datum[]) => Datum[]
}

export default function index({ item, form, visible, setBrandArr }: Props) {

  const [brandIdList, setBrandIdList] = useState([])


  const getBrandIdList = async (name = '') => {
    const res = await fetchBrandSearchService({
      name,
      pageNum: 1,
      pageSize: 999,
    })
    if (res.success) {
      setBrandArr(res.data)
      setBrandIdList(res.data)
    }
  }

  useEffect(() => {
    if (visible) {
      getBrandIdList()
    }
  }, [visible])


  return (
    <Form.Item name={item.name} label={item.label} rules={item.rules}>
      <AutoComplete
        options={brandIdList}
        onSearch={getBrandIdList}
      >
        <Input placeholder={item.placeholder} />
      </AutoComplete>
    </Form.Item>
  )
}
