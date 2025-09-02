import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

interface Category{
  id:string,
  name:string,
  icon: string;
  count:number,
  isSelect?: boolean
}

interface SidebarProps{
  categories:Category[];
  onCategorySelect?: (categoryId: string)=>void;
}

const SideBar: React.FC = () =>{
  const [selectedCategory,SetSelectCategory]=useState<string>('all-tasks');

  const categories :Category[]=[
    { id: 'all-tasks', name: 'All Tasks', icon: '●', count: 5 },
    { id: 'completed', name: 'Completed', icon: '✓', count: 2 },
    { id: 'archived', name: 'Archived', icon: '📁', count: 0 },
  ];

  //function process when user press
  const handleCategoryPress = (categoryId:string)=>{
    SetSelectCategory(categoryId);
  };


  const getCategoryTextStyle = (categoryId:string)=>{
    const isSelected = selectedCategory == categoryId ;
    return[
        styles.categoryText,
        isSelected && styles.categoryTextSelected,
    ]
  }

   // Hàm để lấy style cho mỗi category item
   const getCategoryStyle = (categoryId: string, count: number) => {
    const isSelected = selectedCategory === categoryId;
    
    return [
      styles.categoryItem,
      isSelected && styles.categoryItemSelected,
      count === 0 && styles.categoryItemDisabled
    ];
  };

  // Hàm để lấy style cho count badge
  const getCountBadgeStyle = (count: number) => {
    if(count == 0)return styles.countBadgeZero;
    if(count <= 2) return styles.countBadge;
    return styles.countBadgeDefault;
  };

  return (
    <SafeAreaView style = {styles.container}>
      <View style = {styles.sidebar}>
        <Text style = {styles.title}>Categories</Text>
          <View style = {styles.categoryList}>
            {/* Category list */}
            {categories.map((category)=>(
              <TouchableOpacity  
                key = {category.id}
                style={getCategoryStyle(category.id,category.count)}
                onPress={()=>handleCategoryPress(category.id)}
                activeOpacity={0.7}
              >
                {/* icon */}
                <Text style={getCategoryTextStyle(category.id)}>{category.icon}</Text>

                {/* Category Name */}
                <Text style = {getCategoryTextStyle(category.id)}>{category.name}</Text>

                {/* Count Badge */}
                <View style = {[styles.countBadge,getCountBadgeStyle(category.count)]}>
                  <Text style = {styles.countText}>{category.count}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
      </View>
    </SafeAreaView>
  )

};
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f5f5f5',
  },
  title:{
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  categoryList:{
    gap:6,
  },
  categoryTextSelected:{
    color: '#ffffff',
    fontWeight: '600',
  },
  categoryText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
  },
  sidebar:{
    backgroundColor: '#ffffff',
    marginHorizontal: 12,
    marginTop: 16,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  categoryItemSelected: {
    backgroundColor: '#22c55e', // Màu xanh lá khi được chọn
  },
  categoryItemDisabled: {
    opacity: 0.5,
  },
  countBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  countBadgeDefault: {
    backgroundColor: '#e5e7eb',
  },
  countBadgeZero: {
    backgroundColor: '#f59e0b',
  },
  countText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
});
export default SideBar;