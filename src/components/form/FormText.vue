<template>
  <BaseFormField
    :title="title"
    :error="error"
  >
    <input
      v-model="dataValue"
      class="form__input"
      :type="type"
      :placeholder="placeholder"
    >
  </BaseFormField>
</template>

<script>
import fromFieldMixin from '@/mixins/formFieldMixin.js'

export default {
  mixins: [fromFieldMixin],
  props: {
    type: {
      default: 'text'
    }
  }

}
</script>
