import { Layout } from 'antd'
import React, { PropsWithChildren } from 'react'
import { contentStyle } from '../styles/sectionStyle'

const { Sider, Content } = Layout

export const Dashboard = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Layout style={{ height: '100%' }}>
      <Content style={contentStyle}>{children}</Content>
    </Layout>
  )
}
