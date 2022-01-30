<template>
  <div class="loading cart__desc">
    Добавление товара
  </div>
</template>

<style lang="css">
.loading:after {
    content: '.';
    -webkit-animation: loading 1s ease alternate infinite;
            animation: loading 1s ease alternate infinite;
            animation: loading 1s ease alternate infinite;
            animation: loading 1s ease alternate infinite;
}

@-webkit-keyframes loading {
    60%  { text-shadow: 0.35em 0 0 currentColor; }
    100% { text-shadow: 0.35em 0 0 currentColor, 0.75em 0 0 currentColor; }
}

@keyframes loading {
    60%  { text-shadow: 0.35em 0 0 currentColor; }
    100% { text-shadow: 0.35em 0 0 currentColor, 0.75em 0 0 currentColor; }
}
@keyframes loading {
    60%  { text-shadow: 0.35em 0 0 currentColor; }
    100% { text-shadow: 0.35em 0 0 currentColor, 0.75em 0 0 currentColor; }
}

</style>
