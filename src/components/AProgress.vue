// <template>
//   <div class="c-progress">
//     <p v-if="$slots.default" class="label">
//       <span class="text">
//         <slot />
//       </span>
//       <span class="percent">{{ percent }}</span>
//     </p>
//     <progress ref="progress" class="progress" :value="value" max="100" :title="percent" />
//   </div>
// </template>

// <script>
// export default {
//   props: {
//     value: {
//       type: Number,
//       required: true
//     }
//   },
//   computed: {
//     percent () {
//       const percent = ~~(this.value) + '%'
//       return percent
//     }
//   },
//   mounted () {
//     setTimeout(() => this.$refs.progress.value = this.value, 500)
//   }
// }
// </script>

// <style lang="scss">
// @import '../style/reference';

// // c-progress
// $c-progress-size: 10px                      !default;
// $c-progress-border-radius: $c-progress-size !default;
// $c-progress-background-color: #f8f9fd       !default;

// // c-progress > bar
// $c-progress-bar-background-color: #59efb2   !default;

// // c-progress > label/c-progress-label
// $c-progress-label-color: #8f94b1              !default;
// $c-progress-label-font-size: 12px             !default;
// $c-progress-label-font-family: $c-font-family-title !default;
// $c-progress-label-font-weight: 300 !default;

// .c-progress {
//   & > .label {
//     @extend %c-progress-label;
//     display: flex;
//     margin: 0;
//     margin-bottom: 10px;
//   }

//   & > .progress {
//     appearance: none;
//     border: 0;
//     display: block;
//     overflow: hidden;
//     width: 100%;
//     height: $c-progress-size;
//     border-radius: $c-progress-border-radius;
//     background-color: $c-progress-background-color;

//     &::-webkit-progress-bar {
//       border: 0;
//       height: $c-progress-size;
//       border-radius: $c-progress-size;
//       background-color: $c-progress-background-color;
//     }

//     &::-webkit-progress-value {
//       border: 0;
//       height: $c-progress-size;
//       border-radius: $c-progress-size;
//       background-color: $c-progress-bar-background-color;
//     }

//     &::-moz-progress-bar {
//       border: 0;
//       height: $c-progress-size;
//       border-radius: $c-progress-size;
//       background-color: $c-progress-bar-background-color;
//     }

//     &::-ms-fill {
//       border: none;
//       border-radius: $c-progress-border-radius;
//       background-color: $c-progress-bar-background-color;
//     }
//   }
// }

// %c-progress-label {
//   font-size: $c-progress-label-font-size;
//   font-family: $c-progress-label-font-family;
//   font-weight: $c-progress-label-font-weight;
//   color: $c-progress-label-color;

//   & > .percent { margin-left: auto; }
// }
// </style>
