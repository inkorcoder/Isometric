window.onload = ->

	canvas = document.getElementById 'canvas'
	ctx = canvas.getContext '2d'
	width = canvas.width = window.innerWidth
	height = canvas.height = window.innerHeight

	tileWidth = 15
	tileHeight = 10

	ctx.translate width / 2, tileHeight

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

	for x in [0...50]
		for y in [0...50]
			dx = 25 - x
			dy = 25 - y
			dist = Math.sqrt dx * dx + dy * dy
			z = Math.cos(dist * 0.75) * 2 + 2
			drawBlock x, y, z


	# update = ->

	# 	requestAnimationFrame update
	# 	return
	# update()


	return