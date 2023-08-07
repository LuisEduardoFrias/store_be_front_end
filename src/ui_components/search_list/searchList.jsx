import { useState, useEffect } from 'react';
import Search from './search/search';
import List from './list/list';
import "./searchList.css";

export default function SearchList({ onChange, placeholder, name, value=[]}) {

  const [items, setItems] = useState(value);

  useEffect(() => { 
    onChange({target:{name:name, value:items}});
  },[items])

  function handleAddItem(data) {
    setItems(state => [...state, {
      key: data.key,
      price: data.price,
      name: data.name,
    }]);
  }

  function handleRemoveItem(index) {
    setItems(items.filter((t, i) => i !== index))
  }

  return (
    <div className="container-searchList" >
      <Search
        onAddItem={handleAddItem}
        placeholder={placeholder}
      />
      <List
        items={items}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}