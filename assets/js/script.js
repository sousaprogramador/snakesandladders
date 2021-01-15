$(function () {
  var $player1 = $('<div class="player1 lupid">')
  var $player2 = $('<div class="player2 pig">')
  var currentPlayer = $player1
  var totalStepsTakenByP1 = 1 
  var totalStepsTakenByP2 = 1

  var $circle = $('.circle') 

  var $dieButton = $('.playButton')  
  $dieButton.on('click', play)

  function startPosition () {
    $('#1').append($player1) 
    $('#1').append($player2) 
  }

  function play () {
    var randomDiceResult = 1 + Math.floor(Math.random() * 6)
    var $gamerValue = $('.gamerValue')
    $gamerValue.text(`${randomDiceResult}`)
    playerTurn(randomDiceResult)
  }

  function playerTurn (randomDiceResult) {
    if (currentPlayer === $player1) {
      totalStepsTakenByP1 += randomDiceResult
      $player1.appendTo(`#${totalStepsTakenByP1}`)
      $circle.css('left', '147px') 
      painOrPleasureP1()

      if (randomDiceResult === 6) {
        currentPlayer = $player1 
        $circle.css('left', '25px')
      } else { currentPlayer = $player2 }
    } else if (currentPlayer === $player2) {
      totalStepsTakenByP2 += randomDiceResult
      $player2.appendTo(`#${totalStepsTakenByP2}`)
      painOrPleasureP2()
      $circle.css('left', '25px') 

      if (randomDiceResult === 6) {
        currentPlayer = $player2
        $circle.css('left', '147px')
      } else { currentPlayer = $player1 }
    }
    gameOver()
  }

  function gameOver () {
    if (totalStepsTakenByP1 >= 100) {
      alert('Player 1 has won!')
      resetButton()
    } else if (totalStepsTakenByP2 >= 100) {
      alert('Player 2 has won!')
      resetButton()
    }
  }

  function resetButton () {
    totalStepsTakenByP1 = 1
    totalStepsTakenByP2 = 1
    currentPlayer = $player1
    $player1.appendTo(`#${totalStepsTakenByP1}`)
    $player2.appendTo(`#${totalStepsTakenByP2}`)
    var $gamerValue = $('.gamerValue')
    $gamerValue.text(0)
    clearInterval(clear)
  }

  function snakesLadders () {
    var $tbl = $('#tbl')
    var id = 100
    var rowClass = 10
    for (var r = 0; r < 10; r++) {
      var $row = $('<tr>') 
      $row.attr('class', rowClass--) 

      for (var c = 0; c < 10; c++) {
        var $column = $('<td>') 
        $column.css({ 'width': '50px', 'height': '50px'})
        $column.attr('id', id--) 

        $column.attr('id') % 2 === 0 ? $column.css('backgroundColor', '#ffff00') : $column.css('backgroundColor', 'white')

        $row.each(function() {
          $(this).attr('class') % 2 === 0 ? $row.append($column) : $row.prepend($column)
        })
        $column.html(id + 1).addClass('cell')
      }
      $tbl.append($row)
    }
  }
  snakesLadders()
  startPosition()

  var painAndPleasureArray = [0, 'ladder0', 0, 'ladder1', 0, 0, 'snake0', 0, 'ladder2', 0, 
    'snake1', 0, 'ladder3', 'ladder1', 0, 0, 'snake0', 'ladder0', 'snake3', 'ladder4', 
    0, 0, 0, 'snake5', 0, 0, 'ladder3', 'ladder5', 'snake1', 0, 
    'ladder2', 0, 0, 'snake2', 0, 0, 0, 'ladder4', 0, 'ladder6', 
    0, 0, 'snake4', 0, 0, 0, 0, 0, 0, 0,  
    'ladder7', 0, 0, 'snake2', 0, 0, 0, 0, 'ladder6', 0, 
    0, 'snake3', 'ladder8', 'snake4', 0, 0, 'ladder7', 0, 0, 0, 
    'ladder9', 0, 'snake6', 0, 'snake7', 0, 0, 'snake8', 0, 0, 
    'ladder8', 0, 0, 'ladder5', 0, 0, 'snake5', 0, 0, 0, 
    'ladder9', 0, 'snake6', 0, 'snake7', 0, 0, 0, 'snake8', 0] 

  function painOrPleasureP1 () {
    var currentP1Index = totalStepsTakenByP1 - 1
    painAndPleasureArray.forEach(function (element) {
      if (painAndPleasureArray[currentP1Index] === element && element.length === 7) {
        totalStepsTakenByP1 = (painAndPleasureArray.indexOf(element, painAndPleasureArray.indexOf(element) + 1)) + 1
        $player1.appendTo(`#${totalStepsTakenByP1}`)
      } else if (painAndPleasureArray[currentP1Index] === element && element.length === 6) {
        totalStepsTakenByP1 = (painAndPleasureArray.indexOf(element, painAndPleasureArray.indexOf(element) - 1)) + 1
        $player1.appendTo(`#${totalStepsTakenByP1}`)
      } else { return totalStepsTakenByP1 }
    })
  }

  
  function painOrPleasureP2 () {
    var currentP2Index = totalStepsTakenByP2 - 1
    painAndPleasureArray.forEach(function (element) {
      if (painAndPleasureArray[currentP2Index] === element && element.length === 7) {
        totalStepsTakenByP2 = (painAndPleasureArray.indexOf(element, painAndPleasureArray.indexOf(element) + 1)) + 1
        $player2.appendTo(`#${totalStepsTakenByP2}`)
      } else if (painAndPleasureArray[currentP2Index] === element && element.length === 6) {
        totalStepsTakenByP2 = (painAndPleasureArray.indexOf(element, painAndPleasureArray.indexOf(element) - 1)) + 1
        $player2.appendTo(`#${totalStepsTakenByP2}`)
      } else { return totalStepsTakenByP2 }
    })
  }
})
