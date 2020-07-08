import SearchBar from './SearchBar.js';
import SchemaList from './schemalist/SchemaList.js';
import Breadcrumb from './Breadcrumb.js';

import store from '../store/search.js';
import debounce from '../util/debounce.js';

import { find_recent, find_by_keywords } from '../api/searchschema.js';

import html from './html.js';

const links = [{
  name: "Home",
  link: "#!/"
},{
  name: "Search",
  active: true
}];

export default class {
  constructor(){
    this.debounced_search = debounce(this.search , 500);
    this.state = {
      result: []
    };
    this.search();
  }

  search() {
    if (store.keywords && store.keywords.length > 0)
      find_by_keywords(store.keywords)
      .then(l => this.state.result = l);
    else
      find_recent(20).then(l => this.state.result = l);
  }

  changeKeywords(k){
    store.keywords = k;
    this.debounced_search();
  }

  view() {
    return html`
      <${Breadcrumb} links=${links}/>
      <div>
        <${SearchBar} keywords=${store.keywords} onChange=${k => this.changeKeywords(k)}/>
      </div>
      <div>
        <${SchemaList} list=${this.state.result}/>
      </div>
    `;
  }
}
