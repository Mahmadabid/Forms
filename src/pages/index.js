import * as React from "react"
import Form from "../components/Form";

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => (
  <Layout>
    <Form/>
  </Layout>
)

export const Head = () => <Seo title="Home" />

export default IndexPage
