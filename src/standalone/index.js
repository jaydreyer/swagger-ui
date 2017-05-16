import StandaloneLayout from "./layout"
import "../style/main.scss"

import TopbarPlugin from "plugins/topbar"
import Info from "plugins/info"
import ConfigsPlugin from "plugins/configs"


// the Standalone preset

let preset = [

  TopbarPlugin, Info,
  ConfigsPlugin,

  () => {
    return {
      components: { StandaloneLayout }
    }
  }
]

module.exports = preset
