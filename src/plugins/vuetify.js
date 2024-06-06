// Styles
import '@mdi/font/css/materialdesignicons.css'
import { VStepperVertical, VStepperVerticalItem } from 'vuetify/labs/VStepperVertical'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify(
  {
    components: {
      VStepperVertical,
      VStepperVerticalItem
    },
  }
)
