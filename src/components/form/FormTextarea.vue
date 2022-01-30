<template>
  <BaseFormField
    :title="title"
    :error="error"
  >
    <textarea
      v-model="dataValue"
      class="form__input form__input--area"
      :placeholder="placeholder"
    />
  </BaseFormField>
</template>

<script>
import fromFieldMixin from '@/mixins/formFieldMixin.js'

export default {
  mixins: [fromFieldMixin]

}
</script>
