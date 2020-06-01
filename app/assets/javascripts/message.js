$(function(){

  function buildHTML(message){
    if ( message.image ) {
      var html = 
      `<div class="contents__item">
        <div class="contents__item__top">
          <p class="contents__item__top__user">${message.user_name}</p>
          <p class="contents__item__top__date">#${message.created_at}</p>
        </div>
        <div class="contents__item__bottom">
          <p class="contents__item__bottom__message">
            ${message.text}
          </p>
          <img src=${message.image} >
        </div>
      </div>`
      return html;
    } else {
      var html = 
      `<div class="contents__item">
        <div class="contents__item__top">
          <p class="contents__item__top__user">${message.user_name}</p>
          <p class="contents__item__top__date">#${message.created_at}</p>
        </div>
        <div class="contents__item__bottom">
          <p class="contents__item__bottom__message">
            ${message.text}
          </p>
        </div>
      </div>`
      return html;
    }
  }

  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action")
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".contents").append(html);
      $('form')[0].reset();
      $('.contents').animate({ scrollTop: $('.contents')[0].scrollHeight});
      $('.form__new__btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  })
});