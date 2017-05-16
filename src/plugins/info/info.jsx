import React, { PropTypes } from "react"
import { fromJS } from "immutable"
import ImPropTypes from "react-immutable-proptypes"

class Path extends React.Component {
  static propTypes = {
    host: PropTypes.string,
    basePath: PropTypes.string
  }

  render() {
    let { host, basePath } = this.props

    return (
      <pre className="base-url">
        [ Base url: {host}{basePath}]
      </pre>
    )
  }
}

class Contact extends React.Component {
  static propTypes = {
    data: PropTypes.object
  }

  render(){
    let { data } = this.props
    let name = data.get("name") || "the developer"
    let url = data.get("url")
    let email = data.get("email")

    return (
      <div>
        { url && <div><a href={ url } target="_blank">{ name } - Website</a></div> }
        { email &&
          <a href={`mailto:${email}`}>
            { url ? `Send email to ${name}` : `Contact ${name}`}
          </a>
        }
      </div>
    )
  }
}

class License extends React.Component {
  static propTypes = {
    license: PropTypes.object
  }

  render(){
    let { license } = this.props
    let name = license.get("name") || "License"
    let url = license.get("url")

    return (
      <div>
        {
          url ? <a target="_blank" href={ url }>{ name }</a>
        : <span>{ name }</span>
        }
      </div>
    )
  }
}

class ExternalHosts extends React.Component {
  static propTypes = {
    external_hosts: PropTypes.object
  }

  render(){
    let { external_hosts } = this.props || null
    let ext_production = external_hosts.get("production") || null
    let ext_stage = external_hosts.get("stage") || null
    let ext_qa = external_hosts.get("qa") || null
    let ext_ci = external_hosts.get("ci") || null

    return (
      <div>
        { ext_production || ext_stage || ext_qa || ext_ci ?
        <table>
          <thead>
            <tr>
              <th colSpan={2}>External Hosts</th>
            </tr>
          </thead>
          { ext_production && <tr><td>Production</td><td>{ ext_production}</td></tr> }
          { ext_stage && <tr><td>Stage</td><td>{ ext_stage}</td></tr> }
          { ext_qa && <tr><td>QA</td><td>{ ext_qa}</td></tr> }
          { ext_ci && <tr><td>CI</td><td>{ ext_ci}</td></tr> }
        </table>
        :null }
      </div>
    )
  }
}

class InternalHosts extends React.Component {
  static propTypes = {
    internal_hosts: PropTypes.object
  }

  render(){

    let { internal_hosts } = this.props || null
    let int_production = internal_hosts.get("production") || null
    let int_stage = internal_hosts.get("stage") || null
    let int_qa = internal_hosts.get("qa") || null
    let int_ci = internal_hosts.get("ci") || null

    return (
      <div>
        { int_production || int_stage || int_qa || int_ci ?
        <table>
          <thead>
            <tr>
              <th colSpan={2}>Internal Hosts</th>
            </tr>
          </thead>
          { int_production && <tr><td>Production</td><td>{ int_production}</td></tr> }
          { int_stage && <tr><td>Stage</td><td>{ int_stage}</td></tr> }
          { int_qa && <tr><td>QA</td><td>{ int_qa}</td></tr> }
          { int_ci && <tr><td>CI</td><td>{ int_ci}</td></tr> }
        </table>
        :null }
      </div>
    )
  }
}

export default class Info extends React.Component {
  static propTypes = {
    info: PropTypes.object,
    url: PropTypes.string,
    host: PropTypes.string,
    basePath: PropTypes.string,
    externalDocs: ImPropTypes.map,
    xapidefinition: PropTypes.object,
    getComponent: PropTypes.func.isRequired
  }

  render() {
    let { info, url, host, basePath, getComponent, externalDocs, xapidefinition } = this.props
    let version = info.get("version")
    let description = info.get("description")
    let title = info.get("title")
    let api_name = xapidefinition.get("api_name")
    let termsOfService = info.get("termsOfService")
    let contact = info.get("contact")
    let license = info.get("license")
    let lifecycle_status = xapidefinition.get("lifecycle_status")
    let endpoints = xapidefinition.get("endpoints")
    let external_hosts = endpoints.get("external") || null
    let internal_hosts = endpoints.get("internal") || null
    let overviewMarkdownFile = overview || null
    let classification = xapidefinition.get("overall_data_classification")
    const { url:externalDocsUrl, description:externalDocsDescription } = (externalDocs || fromJS({})).toJS()
    const Markdown = getComponent("Markdown")

    return (
      <div className="info">
        <hgroup className="main">
          <h2 className="title" >{ api_name ? api_name : title }
            { version && <small><pre className="version"> { version } </pre></small> }
          </h2>
          <h4>Lifecycle Status: { lifecycle_status }</h4>
          { classification && <h4>Data Classification: { classification } </h4> }
          { host || basePath ? <Path host={ host } basePath={ basePath } /> : null }
          { url && <a target="_blank" href={ url }><span className="url"> { url } </span></a> }
        </hgroup>

        <div className="description">
          <Markdown options={{html: true, typographer: true, linkify: true, linkTarget: "_blank"}} source={ description } />
        </div>
        {
          termsOfService && <div>
            <a target="_blank" href={ termsOfService }>Terms of service</a>
          </div>
        }

        { contact && contact.size ? <Contact data={ contact } /> : null }
        { license && license.size ? <License license={ license } /> : null }
        { external_hosts && <ExternalHosts external_hosts = { external_hosts } /> }
        { internal_hosts && <InternalHosts internal_hosts = { internal_hosts } /> }
        { externalDocsUrl ?
            <a target="_blank" href={externalDocsUrl}>{externalDocsDescription || externalDocsUrl}</a>
        : null }
        { overviewMarkdownFile ?
            <div className="overview">
              <Markdown container={"div"} options={{html: true, typographer: true, breaks: true, linkify: true, linkTarget: "_blank"}} source={ overviewMarkdownFile } />
            </div>
          : null }
        </div>


    )
  }

}

Info.propTypes = {
  title: PropTypes.any,
  description: PropTypes.any,
  version: PropTypes.any,
  url: PropTypes.string
}
