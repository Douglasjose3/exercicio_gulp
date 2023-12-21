const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));  // gulp-sass integra tudo, mas quem faz todo o trabalho é o sass.
const sourcemaps = require('gulp-sourcemaps'); // para o navegador mapear as linhas de comando (npm install --save-dev gulp-sourcemaps).
const uglify = require('gulp-uglify'); // para comprimir os .js
const obfuscate = require('gulp-obfuscate'); // importar o obfuscate para deixar o código ilegível
const imagemin = require('gulp-imagemin'); // para comprimir as imagens // instalar versão anterior (npm install --save-dev gulp-imagemin@7.1.0)

function comprimirImagens() {
    return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'))
}

function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify()) // minificação do js
        .pipe(obfuscate()) // deixar o código ilegível
        .pipe(gulp.dest('./build/scripts'))
}

function compilaSass() {
    return gulp.src('./source/styles/style.scss')
        .pipe(sourcemaps.init()) 
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps')) // para criar o arquivo de mapeamento.
        .pipe(gulp.dest('./build/styles'))
}

exports.default = function() {
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compilaSass));  // watch para não precisar digitando no terminal para atualizar as mudanças.
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(comprimeJavaScript));
    gulp.watch('./source/images/*', {ignoreInitial:false}, gulp.series(comprimirImagens));
}

/*
function funcaoPadrao(callback) { // funciona com callback
    setTimeout(function() {
        console.log("Executando via Gulp!")
        callback();
    }, 2000)
}

// tarefa publica é quando usamos o exports.
function dizOi(callback) { //callback para usar quando for uma tarefa publica.
    setTimeout(function() {
        console.log('Olá, Gulp!');
        dizTchau();
        callback();
    }, 1000)
}

function dizTchau() { //quando a tarefa for locar não precisa de callback.
    console.log('Tchaú, Gulp!');
} */

// exports.javascript = comprimeJavaScript; // exportar a minificação do js
// exports.images = comprimirImagens; // exportar a compressão das imagens

// exports.default = gulp.series(funcaoPadrao, dizOi); // exportando tarefa padrão    // series: acrescenta tudo dento do setTimeout
// exports.default = gulp.parallel(funcaoPadrao, dizOi); // parallel é outra função gulp
// exports.dizOi = dizOi;
// exports.sass = compilaSass;

// testando: npm rum gulp no terminal
// testando a função: npm rum gulp e o nome da function
// para comprimir os .js tem que instalar o npm install --save-dev gulp-uglify
// obfuscação (npm install --save-dev gulp-obfuscate) para dexar o código ilegível
// imagemin: para comprimir as imagens (npm install --save-dev gulp-imagemin)