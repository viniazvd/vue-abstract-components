<template>
  <table v-if="!!(hasValid) && !(hasError)" class="c-table-builder" :style="tableStyle">
    <tr class="tr-col" :style="trColStyle">
      <th v-if="selectable">
        <input type="checkbox" @click="$toggleSelectAll()" />
      </th>

      <slot name="col" :cols="cols">
        <th
          v-for="({ label, row, icon, styles, sortable, iconToSort }, index) in _cols"
          :key="index"
          class="th-col"
          :style="styles"
        >
          <a-icon
            v-if="!!(sortable && sortable.all)"
            @click.native="$sortableAll(row)"
            :icon="iconToSortAll"
            class="icon-sortable-all"
          />
          <a-icon v-if="false" :icon="icon" width="25" height="25" />
          <span :style="styles">{{ label }}</span>
          <a-icon
            v-if="!!(sortable && sortable.single)"
            @click.native="$sortableSingle(row, index)"
            :icon="iconToSort"
            class="icon-sortable-single"
          />
        </th>
      </slot>
    </tr>

    <tr
      class="tr-row"
      v-for="(row, index) in _rows"
      :key="index"
      :style="trRowStyle"
    >
      <th v-if="selectable">
        <input type="checkbox" :value="row" v-model="checkeds" />
      </th>

      <slot name="row" :rows="row" :cols="cols">
        <td
          class="td-row"
          v-for="(_, _index) in _cols.length"
          :key="_index"
          :style="tdRowStyle"
        >
          <span :style="rowStyle">{{ $row(row, _index) }}</span>
        </td>
      </slot>
    </tr>

    <slot name="total">
      <tr
        v-if="!!(total && total.enable)"
        class="tr-totalizator"
        :style="totalStyle"
      >
        <th
          class="th-totalizator"
          v-for="(_total, index) in totals"
          :key="index"
        >
          <span >{{ _total }}</span>
        </th>
      </tr>
    </slot>
  </table>

  <div v-else class="empty-state">
    EMPTY STATE: {{ msgError }}
  </div>
</template>

<script>
export default {
  components: {
    AIcon: () => import('./AIcon')
  },

  props: {
    tableStyle: Object,

    trColStyle: Object,

    trRowStyle: Object,
    tdRowStyle: Object,

    rowStyle: Object,

    totalStyle: Object,

    cols: Array,
    rows: {
      type: Array,
      required: true
    },

    empty: {
      type: String,
      default: () => ''
    },

    showTotal: Boolean,
    total: Object,

    selectable: Boolean
  },

  data () {
    return {
      checkeds: [],
      allChecked: false,
      iconToSortAll: 'chevron-down',
      hasError: false,
      msgError: ''
    }
  },

  watch: {
    checkeds (val) {
      this.$emit('update:checkeds', val)
    }
  },

  computed: {
    hasValid: {
      get () {
        if (!(this.cols || this.$scopedSlots.col) && !(this.rows || this.$scopedSlots.row)) {
          this.msgError = 'Defina o array de Colunas e Linhas'
          return false
        }

        if (!(this.cols || this.$scopedSlots.col)) {
          this.msgError = 'Defina o array de Colunas'
          return false
        }

        if (!(this.rows || this.$scopedSlots.row)) {
          this.msgError = 'Defina o array de Linhas'
          return false
        }

        return true
      },

      set (v) {
        this.hasError = v
      }
    },

    totals () {
      const makeSum = prop => this.rows.reduce((total, obj) => total + (obj[prop]) || 0, 0)
      const totals = this.cols.map(({ row, hasTotal }) =>
        hasTotal
          ? typeof row === 'object' ? makeSum(row) : console.warn('coe bicho, ai não rola...')
          : row === this.total.colPosition ? this.total.label : null
      )

      return totals
    },

    _cols () {
      // const icons = Array(this.cols.length).fill('chevron-down')
      if (!(!!this.cols)) return []

      if (Array.isArray(this.cols)) {
        const colsWithIconSort = this.cols.map(col => {
          if (typeof col !== 'object') {
            this.msgError = 'O array precisa ser de objetos'
            this.hasValid = true
          }
          const newProp = { iconToSort: 'chevron-down' }

          return { ...col, ...newProp }
        })

        return colsWithIconSort
      }


    },

    _rows () {
      const rowsWithoutGaps = this.$fixSchema(this.rows)

      return rowsWithoutGaps
    }
  },

  methods: {
    $row (row, index) {
      const props = this.cols.map(({ row }) => row)
      const value = row[props[index]] || this.empty

      return value
    },

    $toggleSelectAll() {
      this.allChecked = !this.allChecked
      const toggle = this.allChecked ? this.checkeds = this._rows : this.checkeds = []

      return toggle
    },

    $sortableSingle (row, index) {
      this._cols.map((_col, _index) => {
        _index === index && _col.iconToSort === 'chevron-down'
          ? _col.iconToSort = 'chevron-up'
          : _col.iconToSort = 'chevron-down'

        return _col
      })

      const ordered = this._rows
        .map(_row => _row[row])
        .sort((a, b) => {
          const operator = this.$isNumber(a, b)
          const iconToSort = this._cols[index].iconToSort

          if (iconToSort === 'chevron-down' && operator === true) return a - b

          if (iconToSort === 'chevron-up' && operator === true) return b - a

          if (iconToSort === 'chevron-up' && operator === false) return a < b

          if (iconToSort === 'chevron-down' && operator === false) return a > b
        })

      return this.rows.map((_row, index) => {
        _row[row] = ordered[index]

        return _row
      })
    },

    $sortableAll (row) {
      this.iconToSortAll === 'chevron-down'
        ? this.iconToSortAll = 'chevron-up'
        : this.iconToSortAll = 'chevron-down'

      const newOrder = this._rows
        .sort((a, b) => {
          const operator = this.$isNumber(a[row], b[row])

          if (this.iconToSortAll === 'chevron-down' && operator === true) return a[row] - b[row]

          if (this.iconToSortAll === 'chevron-up' && operator === true) return b[row] - a[row]

          if (this.iconToSortAll === 'chevron-up' && operator === false) return a[row] < b[row]

          if (this.iconToSortAll === 'chevron-down' && operator === false) return a[row] > b[row]
        })

      return this.rows.map((_row, index) => {
        _row = newOrder.find((__row, _index) => _index === index)

        return _row
      })
    },

    $isNumber (a, b) {
      const isNumber = typeof (a && b) === 'number'

      return isNumber
    },

    $fixSchema (array) {
      const props =
        Array.from(
          array.reduce((acc, item) => {
            Object.keys(item).forEach(key => acc.add(key))

            return acc
          }, new Set([]))
        )

      return array.map(item =>
        props.reduce((obj, key) => {
          obj[key] = item[key] || null
          return obj
        }, {})
      )
    }
  }
}
</script>

<style lang="scss">
.c-table-builder {
  & > .tr-col {
    & > .th-col {

      & > .icon-sortable-all {
        width: 25px;
        height: 25px;
        margin: { bottom: -8px; }
        padding-right: 5px;
        cursor: pointer;
      }

      & > .icon-sortable-single {
        width: 12px;
        height: 12px;
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }

  & > .tr-row {
    & > .td-row {}
  }

  & > .tr-totalizator {
    & > .th-totalizator {}
  }
}

.empty-state {}
</style>
