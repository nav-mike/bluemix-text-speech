$(document).ready(function(){
  console.log('render component');

  window.FormComponent = React.createClass({
    render: function() {
      return (
        <div>
          <h1>Simple text speech</h1>
          <form className="form-horizontal">
              <fieldset>
                <div className="form-group is-empty">
                  <label htmlFor="url" className="col-md-2 control-label">Url to iFMO.LOD page</label>
                  <div className="col-md-10">
                    <input className="form-control" id="url" placeholder="LOD url" type="text" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-md-10 col-md-offset-2">
                    <button type="button" className="btn btn-default">Cancel</button>
                    <button type="button" className="btn btn-primary">Submit</button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
      );
    }
  });
});
