window.onload = ->

	canvas = document.getElementById 'canvas'
	ctx = canvas.getContext '2d'
	width = canvas.width = window.innerWidth
	height = canvas.height = window.innerHeight

	characterCanvas = document.getElementById 'characterCanvas'
	ctx2 = characterCanvas.getContext '2d'
	width = characterCanvas.width = window.innerWidth
	height = characterCanvas.height = window.innerHeight

	tileWidth = 60
	tileHeight = 30

	ctx.translate width / 2, 50
	ctx2.translate width / 2, 50

	charX = 0
	charY = 9

	grid = [
		[15, 15, 15, 14, 13, 10, 3, 2, 1, 0]
		[15, 15, 14, 13, 10, 10, 3, 2, 1, 0]
		[15, 14, 13, 10, 10, 3, 3, 2, 1, 0]
		[14, 13, 10, 9, 3, 3, 2, 1, 0, 0]
		[13, 10, 9, 7, 3, 2, 1, 0, 0, 0]
		[10, 9, 7, 6, 3, 2, 1, 0, 0, 0]
		[9, 7, 6, 5, 3, 2, 1, 1, 1, 1]
		[7, 6, 5, 3, 3, 2, 2, 2, 2, 2]
		[6, 5, 5, 3, 3, 3, 3, 3, 3, 3]
		[5, 5, 5, 5, 5, 5, 5, 5, 5, 3]
	]

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
		ctx.translate (x - y) * tileWidth / 2 , (x + y) * tileHeight / 2 - 11 + (if index < 4 then 5 else 0)
		ctx.drawImage img, index * tileWidth, 0, tileWidth, img.height, -tileWidth / 2, 0, tileWidth, img.height
		ctx.restore()
		return

	draw = ->
		for y in [0...grid.length]
			row = grid[y]
			for x in [0...row.length]
				drawImageTile x, y, row[x]
		return

	drawCharacter = (image, x, y)->
		ctx2.clearRect -width / 2, -50, width, height
		ctx2.save()
		ctx2.translate (x - y) * tileWidth / 2 , (x + y) * tileHeight / 2
		ctx2.drawImage image, -image.width / 2, -image.height / 2
		ctx2.restore()
		return

	canMove = (x, y)->
		x = Math.floor x
		y = Math.floor y
		if y < 0 or y >= grid.length then return false
		if x < 0 or x >= grid[y].length then return false
		tile = grid[y][x]
		if tile < 4 or tile > 14 then return false
		return true

	moveCharacter = (event)->
		switch event.keyCode
			when 37
				if canMove(charX - 1, charY) then charX--; drawCharacter character, charX, charY
			when 39
				if canMove(charX + 1, charY) then  charX++; drawCharacter character, charX, charY
			when 38
				if canMove(charX, charY - 1) then charY--; drawCharacter character, charX, charY
			when 40
				if canMove(charX, charY + 1) then charY++; drawCharacter character, charX, charY

	img = document.createElement 'img'
	img.addEventListener 'load', ->
		draw()
	img.src = 'img/tiles.png'

	character = document.createElement 'img'
	character.addEventListener 'load', ->
		drawCharacter character, charX, charY
		document.body.addEventListener 'keydown', moveCharacter
	character.src = 'img/tux.png'

	# update = ->

	# 	requestAnimationFrame update
	# 	return
	# update()


	return