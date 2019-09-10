module.exports = (fileName, title) => `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name=App-Config content="fullscreen=yes,useHistoryState=yes,transition=yes">
    <meta content=yes name=apple-mobile-web-app-capable>
    <meta content=yes name=apple-touch-fullscreen>
    <meta content="telephone=no,email=no" name=format-detection>
    <meta name=viewport content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${fileName}(${title})</title>
    <link rel="stylesheet" href="../dist/main.css">

</head>

<body>
    <!-- 头 -->
    <header class="a-nav-bar">
        <a href="../index.html" class="a-nav-bar__icon-arrow"></a>
        ${fileName}(${title})
    </header>
    <!-- 头 -->


    <article class="p-1">
        <div class="a-${fileName}">

        </div>
    </article>

</body>

</html>`