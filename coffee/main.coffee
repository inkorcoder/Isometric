window.onload = ->

	canvas = document.getElementById 'canvas'
	ctx = canvas.getContext '2d'
	width = canvas.width = window.innerWidth
	height = canvas.height = window.innerHeight

	tileWidth = 60
	tileHeight = 30

	ctx.translate width / 2, 100

	drawTile = (x, y, color)->
		ctx.save()
		ctx.translate (x - y) * tileWidth / 2 , (x + y) * tileHeight / 2

		ctx.beginPath()
		ctx.moveTo 0, 0
		ctx.lineTo tileWidth / 2, tileHeight / 2
		ctx.lineTo 0, tileHeight
		ctx.lineTo -tileWidth / 2, tileHeight / 2
		ctx.closePath()
		ctx.fillStyle = color
		ctx.fill()

		ctx.restore()
		return

	drawBlock = (x, y, z)->
		top = '#eeeeee'
		left = '#cccccc'
		right = '#999999'
		ctx.save()

		# top
		ctx.translate (x - y) * tileWidth / 2 , (x + y) * tileHeight / 2
		ctx.beginPath()
		ctx.moveTo 0, -z * tileHeight
		ctx.lineTo tileWidth / 2, tileHeight / 2 - z * tileHeight
		ctx.lineTo 0, tileHeight - z * tileHeight
		ctx.lineTo -tileWidth / 2, tileHeight / 2 - z * tileHeight
		ctx.closePath()
		ctx.fillStyle = top
		ctx.fill()

		# left
		ctx.beginPath()
		ctx.moveTo -tileWidth / 2, tileHeight / 2 - z * tileHeight
		ctx.lineTo 0, tileHeight - z * tileHeight
		ctx.lineTo 0, tileHeight
		ctx.lineTo -tileWidth / 2, tileHeight / 2
		ctx.closePath()
		ctx.fillStyle = left
		ctx.fill()

		# right
		ctx.beginPath()
		ctx.moveTo tileWidth / 2, tileHeight / 2 - z * tileHeight
		ctx.lineTo 0, tileHeight - z * tileHeight
		ctx.lineTo 0, tileHeight
		ctx.lineTo tileWidth / 2, tileHeight / 2
		ctx.closePath()
		ctx.fillStyle = right
		ctx.fill()

		ctx.restore()

		return

	randomColor = ->
		r = Math.floor Math.random() * 255
		g = Math.floor Math.random() * 255
		b = Math.floor Math.random() * 255
		return "rgb(#{r},#{g},#{b})"

	drawImageTile = (x, y, index)->
		ctx.save()
		ctx.translate (x - y) * tileWidth / 2 , (x + y) * tileHeight / 2 + (if index < 4 then 5 else 0)
		ctx.drawImage img, index * tileWidth, 0, tileWidth, img.height, -tileWidth / 2, 0, tileWidth, img.height
		ctx.restore()
		return

	draw = ->
		for x in [0...10]
			for y in [0...10]
				drawImageTile x, y, Math.floor Math.random() * 16
				# drawBlock x, y, Math.floor Math.random() * 4
		return

	img = document.createElement 'img'
	img.addEventListener 'load', ->
		draw()
	img.src = 'img/tiles.png'

	# update = ->

	# 	requestAnimationFrame update
	# 	return
	# update()


	return