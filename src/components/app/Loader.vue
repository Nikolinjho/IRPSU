<template>
  <div class="preloader">
    <div class="preloader__content">
      <div class="preloader__img">
        <svg
          version="1.1"
          id="L5"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 60 60"
          enable-background="new 0 0 0 0"
          xml:space="preserve"
        >
          <circle fill="#f74343" stroke="none" cx="6" cy="30" r="6">
            <animateTransform
              attributeName="transform"
              dur="1s"
              type="translate"
              values="0 15 ; 0 -15; 0 15"
              repeatCount="indefinite"
              begin="0.1"
            ></animateTransform>
          </circle>
          <circle fill="#ffae71" stroke="none" cx="30" cy="30" r="6">
            <animateTransform
              attributeName="transform"
              dur="1s"
              type="translate"
              values="0 10 ; 0 -10; 0 10"
              repeatCount="indefinite"
              begin="0.2"
            ></animateTransform>
          </circle>
          <circle fill="#3eff35" stroke="none" cx="54" cy="30" r="6">
            <animateTransform
              attributeName="transform"
              dur="1s"
              type="translate"
              values="0 5 ; 0 -5; 0 5"
              repeatCount="indefinite"
              begin="0.3"
            ></animateTransform>
          </circle>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loader-component'
};
</script>

<style scoped lang="scss">
.preloader{
  margin: 50px 0;
  width: 100%;
  height: 100%;
  background: #fff;
  &__content{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__img{
    display: inline-block;
    width: 100px;
    height: 100px;;
  }
}
</style>