$(document).ready(function(){
  console.log('render component');

  window.FormComponent = React.createClass({
    getInitialState: function() {
      return {url: 'http://lod.ifmo.ru/page/Laboratory87847'};
    },

    handleClick: function(event) {
      console.log(this.state.url);
      $.ajax({
        url: '/q.json',
        data: {url: this.state.url},
        type: 'POST',
        success: function(data) {
          console.log(data);
          window.open('resources/output.wav','','...');
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus);
        }
      });
    },

    handleChange: function(event) {
      this.setState({url: event.target.value});
    },

    render: function() {
      return (
        <div>
          <h1>Simple text speech</h1>
          <form className="form-horizontal">
              <fieldset>
                <div className="form-group is-empty">
                  <label htmlFor="url" className="col-md-2 control-label">Url to iFMO.LOD page</label>
                  <div className="col-md-10">
                    <input className="form-control" id="url" placeholder="LOD url"
                           type="text" onChange={this.handleChange}
                           value={this.state.url}/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-md-10 col-md-offset-2">
                    <button type="button" className="btn btn-primary"
                            onClick={this.handleClick}>Submit</button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
      );
    }
  });
});
