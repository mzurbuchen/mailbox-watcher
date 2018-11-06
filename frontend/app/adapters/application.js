import DS from "ember-data";

export default DS.JSONAPIAdapter.extend({
  namespace: "api",

  buildURL: function(modelName, id, snapshot, requestType, query) {
    if (requestType === "queryRecord") {
      var url = this._buildURL(modelName, query.id);
      delete query.id;
      return url;
    } else {
      const apiUrl = this._super(modelName, id, snapshot, requestType, query);
      const authenticityToken = localStorage.getItem("authenticityToken");
      return apiUrl + "?token=" + authenticityToken;
    }
  }
});