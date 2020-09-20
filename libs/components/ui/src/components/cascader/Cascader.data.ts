import { Cascader } from './Cascader.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const cascaderData: NodeDtoReactI<Cascader.Props> = {
  type: 'React.Cascader',
  props: {
    options: [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ],
    placeholder: 'Please select',
  },
}