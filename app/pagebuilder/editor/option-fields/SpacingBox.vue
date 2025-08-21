<script setup lang="ts">

interface Props {
  modelValue: {
    paddingTop: number
    paddingRight: number
    paddingBottom: number
    paddingLeft: number
    marginTop: number
    marginRight: number
    marginBottom: number
    marginLeft: number
  }
}

interface Emits {
  (e: 'update:modelValue', value: Props['modelValue']): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Local state for inputs
const paddingTop = ref(props.modelValue.paddingTop)
const paddingRight = ref(props.modelValue.paddingRight)
const paddingBottom = ref(props.modelValue.paddingBottom)
const paddingLeft = ref(props.modelValue.paddingLeft)
const marginTop = ref(props.modelValue.marginTop)
const marginRight = ref(props.modelValue.marginRight)
const marginBottom = ref(props.modelValue.marginBottom)
const marginLeft = ref(props.modelValue.marginLeft)

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  paddingTop.value = newValue.paddingTop
  paddingRight.value = newValue.paddingRight
  paddingBottom.value = newValue.paddingBottom
  paddingLeft.value = newValue.paddingLeft
  marginTop.value = newValue.marginTop
  marginRight.value = newValue.marginRight
  marginBottom.value = newValue.marginBottom
  marginLeft.value = newValue.marginLeft
}, { deep: true })

function updatePadding() {
  emit('update:modelValue', {
    paddingTop: paddingTop.value,
    paddingRight: paddingRight.value,
    paddingBottom: paddingBottom.value,
    paddingLeft: paddingLeft.value,
    marginTop: marginTop.value,
    marginRight: marginRight.value,
    marginBottom: marginBottom.value,
    marginLeft: marginLeft.value
  })
}

function updateMargin() {
  emit('update:modelValue', {
    paddingTop: paddingTop.value,
    paddingRight: paddingRight.value,
    paddingBottom: paddingBottom.value,
    paddingLeft: paddingLeft.value,
    marginTop: marginTop.value,
    marginRight: marginRight.value,
    marginBottom: marginBottom.value,
    marginLeft: marginLeft.value
  })
}
</script>

<template>
  <div class="spacing-box">
    <div class="box-model">
      <!-- Margin Box -->
      <div class="margin-box">
        <div class="margin-label">margin</div>
        
        <!-- Margin Top -->
        <input
          v-model.number="marginTop"
          type="number"
          class="margin-input margin-top"
          min="0"
          max="200"
          @input="updateMargin"
        />
        
        <!-- Margin Left -->
        <input
          v-model.number="marginLeft"
          type="number"
          class="margin-input margin-left"
          min="0"
          max="200"
          @input="updateMargin"
        />
        
        <!-- Margin Right -->
        <input
          v-model.number="marginRight"
          type="number"
          class="margin-input margin-right"
          min="0"
          max="200"
          @input="updateMargin"
        />
        
        <!-- Margin Bottom -->
        <input
          v-model.number="marginBottom"
          type="number"
          class="margin-input margin-bottom"
          min="0"
          max="200"
          @input="updateMargin"
        />
        
        <!-- Padding Box -->
        <div class="padding-box">
          <div class="padding-label">padding</div>
          
          <!-- Padding Top -->
          <input
            v-model.number="paddingTop"
            type="number"
            class="padding-input padding-top"
            min="0"
            max="200"
            @input="updatePadding"
          />
          
          <!-- Padding Left -->
          <input
            v-model.number="paddingLeft"
            type="number"
            class="padding-input padding-left"
            min="0"
            max="200"
            @input="updatePadding"
          />
          
          <!-- Padding Right -->
          <input
            v-model.number="paddingRight"
            type="number"
            class="padding-input padding-right"
            min="0"
            max="200"
            @input="updatePadding"
          />
          
          <!-- Padding Bottom -->
          <input
            v-model.number="paddingBottom"
            type="number"
            class="padding-input padding-bottom"
            min="0"
            max="200"
            @input="updatePadding"
          />
          
          <!-- Content Box -->
          <div class="content-box">
            <div class="content-dimensions">
              NaN x NaN 
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.spacing-box {
  padding: 16px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.box-model {
  position: relative;
  width: 240px;
  margin: 0 auto;
}

.margin-box {
  position: relative;
  background: #fef3c7;
  border: 1px solid #f59e0b;
  border-radius: 4px;
  padding: 20px;
  min-height: 140px;
}

.padding-box {
  position: relative;
  background: #dcfce7;
  border: 1px solid #22c55e;
  border-radius: 4px;
  padding: 20px;
  min-height: 80px;
}

.content-box {
  background: #dbeafe;
  border: 1px solid #3b82f6;
  border-radius: 4px;
  padding: 12px;
  text-align: center;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.margin-label,
.padding-label {
  position: absolute;
  top: 2px;
  left: 4px;
  font-size: 10px;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.margin-input,
.padding-input {
  position: absolute;
  width: 32px;
  height: 20px;
  border: 1px solid #d1d5db;
  border-radius: 2px;
  text-align: center;
  font-size: 11px;
  background: white;
  outline: none;
}

.margin-input:focus,
.padding-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

/* Margin positioning */
.margin-top {
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.margin-bottom {
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.margin-left {
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
}

.margin-right {
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
}

/* Padding positioning */
.padding-top {
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.padding-bottom {
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.padding-left {
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
}

.padding-right {
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
}

.content-dimensions {
  font-size: 11px;
  color: #1f2937;
  font-weight: 500;
}

/* Remove number input arrows */
.margin-input::-webkit-outer-spin-button,
.margin-input::-webkit-inner-spin-button,
.padding-input::-webkit-outer-spin-button,
.padding-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.margin-input[type=number],
.padding-input[type=number] {
  -moz-appearance: textfield;
}
</style>