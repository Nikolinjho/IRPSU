<template>
  <div class="records">
    <button class="records__close"
    @click="closeTable">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path d="M2 2L18 18" stroke="black" stroke-width="1.5" />
        <path d="M2 18L18 2" stroke="black" stroke-width="1.5" />
      </svg>
    </button>
    <h1 class="records__title">Результаты</h1>
    <div class="records__table">
      <div class="record">
        <div class="record__col">id</div>
        <div class="record__col">value</div>
        <div class="record__col">time</div>
      </div>
      <div class="record"
       v-for="record in getTableData" :key="record.id">
        <div class="record__col">{{record.id}}</div>
        <div class="record__col">{{record.value}}</div>
        <div class="record__col">{{record.time}} sec</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'records-table',
  created(){

  },
  methods: {
    closeTable() {
      this.$emit('shouldCloseTable')
    }
  },
  computed: {
    getTableData(){
      return this.$store.getters.getTable
    }
  }
};
</script>

<style scoped lang="scss">
.records {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  z-index: 11;
  padding: 50px;
  &__table {
    max-width: 650px;
    margin: 45px auto;
  }
  &__close {
    position: absolute;
    top: 30px;
    right: 40px;
    background: transparent;
    border: none;
    outline: none;
    margin: 0;
    padding: 0;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
}
.record {
  display: flex;
  &__col {
    padding: 8px 12px;
    
    background-color:#fbfbfb;
    text-align: left;
    &:nth-child(1),
    &:nth-child(3) {
      text-align: right;
      width: 20%;
      flex: 1 0 20%;
    }
    &:nth-child(2) {
      width: 60%;
      flex: 1 0 60%;
      word-break: break-all;
    }
  }
}
</style>
