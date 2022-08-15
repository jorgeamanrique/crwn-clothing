import CategoryItem from '../category-item/category-item.component';
import './directory.styles.scss';

const Directoy = ({ categories }) => {
  return (
    categories.map((category) => (
        <CategoryItem key={category.id} category={category}></CategoryItem>
    ))
  )
}

export default Directoy;