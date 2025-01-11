package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	// Crea una instancia del servidor Gin
	r := gin.Default()

	// Configura las rutas para servir archivos estáticos y plantillas
	r.LoadHTMLGlob("templates/*")
	r.Static("/assets", "./assets")

	// Ruta para la página principal
	r.GET("/", func(c *gin.Context) {
		c.HTML(200, "index.html", nil)
	})

	// Si tienes otras páginas, añade más rutas aquí
	r.GET("/about", func(c *gin.Context) {
		c.HTML(200, "about.html", nil)
	})

	// Inicia el servidor en el puerto 8080
	r.Run(":8080")
}
