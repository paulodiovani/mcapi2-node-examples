/*
 * List the groups of list
 */
exports.list = function(req, res) {
  mc.lists.list({filters:{list_id: req.params.id}}, function(listData) {
  var list = listData.data[0];

    mc.lists.interestGroupings({id: req.params.id, counts: true}, function(data) {
      res.render('groups/list', { title: list.title, list: list, interestGroups:data });
    }, function(error) {
      console.log(error);
      if (error.name == "List_DoesNotExist") {
      req.session.error_flash = "The list does not exist";
      } else if (error.error) {
      req.session.error_flash = error.code + ": " + error.error;
      } else {
      req.session.error_flash = "An unknown error occurred";
      }
      res.redirect('/lists');
    });  
  });
};
