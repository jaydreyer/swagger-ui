import StandaloneLayout from "./layout"
import "../style/main.scss"

import TopbarPlugin from "plugins/topbar"
import Info from "plugins/info"

// the Standalone preset

let preset = [
  TopbarPlugin, Info, 
  () => {
    return {
      components: { StandaloneLayout }
    }
  }
]

module.exports = preset
