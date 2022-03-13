<template>
  <div class="game">
    <div class="game__img">
      <img :src="`${data.img_src}`" alt="" />
    </div>
    <div class="game__result">
      <div class="flex">
        <div>
          {{ resultWord }}
        </div>
        <div class="caret"></div>
      </div>
    </div>
    <Loader v-if="loading" />
    <div class="game__body" v-else>
      <div class="game__static-input">
        <div class="key-btn key-btn_large" @mouseup="addSpace">SPACE</div>
        <div class="key-btn" @mouseup="removeLetter">Del</div>
      </div>
      <div class="game__input">
        <div
          class="key-btn"
          v-for="letter in letters"
          :key="letter.id"
          @mouseup="pressKey(letter)"
          :class="{ 'key-btn_locked': letter.locked }"
        >
          {{ letter.value }}
        </div>
      </div>
    </div>
    <transition name="slide-fade">
      <div class="game__end" v-if="isEnd">
        <div class="game__end-title">Вы выиграли! Повторить?</div>
        <div class="game__end-btn">
          <button @click="retryGame">Конечно</button>
          <button @click="showResult">Я уже устал</button>
        </div>
      </div>
    </transition>
    <transition name="slide-up">
      <RecordsTable v-if="showRecords" @shouldCloseTable="closeTable" />
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
import shuffle from 'lodash.shuffle';

import Loader from './app/Loader.vue';
import RecordsTable from './RecordsTable';

export default {
  name: 'game-component',
  components: {
    Loader,
    RecordsTable,
  },
  data: () => ({
    loading: true,
    isEnd: false,
    showRecords: false,
    api: 'https://apidir.pfdo.ru/v1/directory-program-activities/',
    randomRange: {
      min: 2,
      max: 1368,
    },
    data: {},
    letters: [],
    path: [],
    startTime: 0,
    id: 0,
  }),
  async created() {
    await this.startGame();
  },
  methods: {
    addSpace() {
      this.path.push({
        value: '\xa0',
      });
    },
    removeLetter() {
      if (!this.path.length) {
        return;
      }
      const compared = this.compareByLetter();
      if (compared) {
        const lastLetter = this.path[this.path.length - 1];
        lastLetter.locked = false;
      }
      this.path.splice(this.path.length - 1, 1);
    },
    pressKey(letter) {
      if (!letter.locked) {
        this.path.push(letter);
      }
      const compared = this.compareByLetter();
      if (compared) {
        const pressedLetter = this.path.find(item => item.id === letter.id);
        pressedLetter.locked = true;
      }
    },
    closeTable() {
      this.showRecords = false;
    },
    compareByLetter() {
      let equal = false;
      for (let i = 0; i < this.path.length; i++) {
        if (this.path[i].value !== this.data.name[i]) {
          equal = false;
          break;
        }
        equal = true;
      }
      return equal;
    },
    finishGame() {
      const time = ((performance.now() - this.startTime) / 1000).toFixed(2);
      this.$store.dispatch('setRecord', {
        id: this.id,
        value: this.data.name,
        time,
      });
      this.id++;
      this.isEnd = true;
    },
    retryGame() {
      this.startGame();
      this.isEnd = false;
      this.path = [];
    },
    showResult() {
      this.showRecords = true;
    },
    async startGame() {
      this.data = await this.getData();
      this.startTime = performance.now();
      this.loading = false;
      const name = this.data.name.toUpperCase();
      this.data.name = name;
      this.letters = shuffle(this.createArrayFromString(name));
    },
    createArrayFromString(string) {
      return string
        .split('')
        .filter(el => el !== ' ')
        .map((el, index) => {
          return {
            value: el,
            id: index,
          };
        });
    },
    async getData() {
      const randomId = Math.floor(
        Math.random() * (this.randomRange.max - this.randomRange.min) +
          this.randomRange.min,
      );
      const response = await axios
        .get(`${this.api}${randomId}`)
        .then(response => {
          console.log('retrying...', response);
          if (response.data.result_code === 'FLSCS') {
            return response.data.data;
          }
          return this.getData();
        });
      return response;
    },
  },
  computed: {
    resultWord() {
      return this.path.map(el => el.value).join('');
    },
  },
  watch: {
    path(newVal) {
      const string = newVal.map(el => el.value).join('');
      if (string === this.data.name) {
        this.finishGame();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.game {
  &__result {
    mt
    border-bottom: 1px solid #e3e3e3;
    font-size: 30px;
    min-height: 35px;
  }
  &__body {
    max-width: 600px;
    margin: 100px auto 0;
  }
  &__input {
    margin-top: 35px;
  }
  &__img {
    margin-top: 40px;
    img {
      max-width: 200px;
    }
  }
  &__end {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 500px;
    background: #fff;
    z-index: 10;
    transform: translate(-50%, -50%);
    padding: 45px 25px;
    border-radius: 10px;
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    &-title {
      font-size: 35px;
    }
    &-btn {
      margin-top: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        border: none;
        outline: none;
        margin: 0 15px;
        cursor: pointer;
        padding: 12px 16px;
        background: rgb(51, 118, 219);
        border-radius: 10px;
        font-size: 18px;
        color: #fff;
      }
    }
  }
}

.flex {
  display: flex;
  align-items: center;
  justify-content: center;
  .caret {
    margin-left: 3px;
    width: 2px;
    min-height: 33px;
    background-color: #000;
    animation: typing 1s infinite;
  }
}

.key-btn {
  display: inline-block;
  margin: 3px;
  width: 60px;
  min-height: 35px;
  background-color: #eeeeee;
  border-radius: 4px;
  padding: 15px;
  font-size: 22px;
  font-weight: 600;
  box-sizing: border-box;
  line-height: 1;
  text-align: center;
  cursor: pointer;
  transition: transform 0.15s ease;
  user-select: none;
  &_large {
    width: 120px;
  }
  &_locked {
    opacity: 0.4;
    cursor: default;
  }
  &:not(.key-btn_locked):active {
    transform: translateY(2px);
  }
}

.slide-up-enter-active {
  transition: all 0.8s ease;
}

.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter,
.slide-up-leave-to {
  transform: translate(0, 250px);
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  top: 0;
  opacity: 0;
}

@keyframes typing {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
