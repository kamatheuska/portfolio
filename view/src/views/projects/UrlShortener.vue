<template>
    <div class="url-shortener">
        <h1>Url Shortener</h1>
        <h2>Short URL Creation</h2>
        <h3 class="url-shortener__h3">Example Usage</h3>
        <a href="/api/shorturl/1">
            http://www.nicolasramirezka.com/api/shorturl/1
        </a>
        <h3 class="url-shortener__h3">It will redirect to:</h3>
        <p>https://www.freecodecamp.org/forum/</p>

        <form class="url-shortener__form" action="/api/shorturl/new" method="POST">
            <label for="url_input">URL to be shortened</label>
            <input id="url_input" type="text" name="url" value="www.freecodecamp.org">
            <input type="submit" value="POST URL">
        </form>
    </div>
</template>

<style lang="less" scoped>
.url-shortener {
    height: 100%;
    padding-top: 5rem;
    padding-bottom: 5rem;
    padding-right: 5rem;
    padding-left: 5rem;
    background-color: #00000077;
    color: @portfolio-white;
    &__h3 {
        margin-top: 30px;
    }

    &__form {
        border: solid 1px black;
        border-radius: 5px;
        margin: 10px auto;
        padding: 20px;
        max-width: 600px;
    }
}


</style>