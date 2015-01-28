/**
 * Created by dsmink on 28/01/2015.
 */

$(function () {
   $('.items').on('click', '.delete', function (evt) {
      if (confirm('Are you sure you want to delete this item?')) {
            deleteItem($(evt.target).data('id'));
      }
   });
});

function deleteItem(id) {
    $.ajax('/' + id, {
       type: 'DELETE'
    }).fail(function (err) {
        console.error(err);
    }).done(function () {
        location.reload();
    });
}