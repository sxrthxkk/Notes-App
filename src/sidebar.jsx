
function Sidebar(){
    return <div className="sidebar-conatiner">
        <div className="header">
            <h1>Notes</h1>
            <button>Add</button>
        </div>
        <div className="sidebar-notes">
            <div className="sidebar-n">
              <div className="sidebar-note-title">
                <strong className='bg'>TITLE</strong>
                <button>Delete</button>
              </div>
              <p>note preview</p>
              <small className="note-meta">Last modified [date]</small>
            </div>
        </div>
    </div>
}
export default Sidebar