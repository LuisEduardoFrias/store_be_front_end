import { useState, useEffect } from 'react';
import Search from './search/search';
import List from './list/list';
import "./searchList.css";

export default function SearchList({ onChange, name, value=[]}) {

  const [items, setItems] = useState(value);

  useEffect(() => { 
    onChange({target:{name:name, value:items}});
  },[items])

  function handleAddItem(data) {
    setItems([...items, {
      key: data.key,
      price: data.price,
      name: data.name,
    }]);
  }

  function handleRemoveItem(key) {
    setItems(items.filter(t => t.key !== key))
  }

  return (
    <div className="container-searchList" >
      <Search
        onAddItem={handleAddItem}
      />
      <List
        items={items}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}