import React, { useState } from 'react';
import {
  IconButton,
  Typography,
  Input,
  Drawer,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Checkbox,
  Button,
} from '@material-tailwind/react';
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';
import { useProductStore } from '../../../store/useProductStore';
import useFetchCategories from '../../../hooks/useFetchAllCategory';

function FilterContent({ filters, handleSearchChange, handleFilterChange, open, handleOpen, clearFilters }) {
  const { categories } = useFetchCategories();

  return (
    <>
      <div className="mb-2 flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <img
            src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
            alt="brand"
            className="h-8 w-8"
          />
          <Typography variant="h5" color="blue-gray">
            Filters
          </Typography>
        </div>
      </div>

      <div className="p-2">
        <Input
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          label="Search"
          variant="outlined"
          value={filters.searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <FilterOptions
        open={open}
        handleOpen={handleOpen}
        filters={filters}
        handleFilterChange={handleFilterChange}
        categories={categories}
      />
    </>
  );
}

export default function FilterSidebar() {
  const [open, setOpen] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { filters, setFilter, applyFilters, clearFilters } = useProductStore();

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleFilterChange = (filterType, value) => {
    setFilter(filterType, value);
    applyFilters();
  };

  const handleSearchChange = (e) => {
    handleFilterChange('searchQuery', e.target.value);
  };

  const handleClearFilters = () => {
    clearFilters();
    applyFilters();
  };

  return (
    <div className="relative">
      <div className="fixed top-16 left-0 lg:hidden">
        <IconButton variant="text" size="lg" onClick={openDrawer}>
          {isDrawerOpen ? (
            <XMarkIcon className="h-8 w-8 stroke-2" />
          ) : (
            <AdjustmentsHorizontalIcon className="h-6 w-6" />
          )}
        </IconButton>
      </div>

      <Drawer open={isDrawerOpen} onClose={closeDrawer} className="lg:hidden">
        <Card color="white" shadow={false} className="h-full w-full p-4 bg-gray-300">
          <FilterContent
            filters={filters}
            handleSearchChange={handleSearchChange}
            handleFilterChange={handleFilterChange}
            open={open}
            handleOpen={handleOpen}
            clearFilters={handleClearFilters}
          />
        </Card>
      </Drawer>
      <div className="hidden fixed lg:block lg:w-72 2xl:w-96 lg:h-full lg:p-4">
        <Card color="transparent" shadow={false} className="h-full p-4">
          <FilterContent
            filters={filters}
            handleSearchChange={handleSearchChange}
            handleFilterChange={handleFilterChange}
            open={open}
            handleOpen={handleOpen}
            clearFilters={handleClearFilters}
          />
        </Card>
      </div>
    </div>
  );
}

function FilterOptions({ open, handleOpen, filters, handleFilterChange, categories }) {
  const priceRanges = [
    'Below 500',
    '500 to 1000',
    '1001 to 2000',
    '2001 to 5000',
    'Above 5000'
  ];
  const sortOptions = ['price-low-high', 'price-high-low', 'newest-first', 'best-rating'];

  const handleCategoryChange = (categoryId) => {
    let updatedCategories;

    // If the category is already selected, remove it, otherwise add it
    if (filters.categories.includes(categoryId)) {
      updatedCategories = filters.categories.filter((id) => id !== categoryId);
    } else {
      updatedCategories = [...filters.categories, categoryId];
    }

    // Update the filters with the new categories array
    handleFilterChange('categories', updatedCategories);
  };
  return (
    <List>
      {/* Category Filter */}
      <Accordion
        open={open === 1}
        icon={
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? 'rotate-180' : ''}`}
          />
        }
      >
        <ListItem className="p-0" selected={open === 1}>
          <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
            <ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Category
              </Typography>
            </ListItemPrefix>
          </AccordionHeader>
        </ListItem>
        <AccordionBody className="py-1">
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category._id}>
                <Checkbox
                  id={`category-${category._id}`}
                  label={category.name}  // Display the category name
                  checked={filters.categories.includes(category._id)}  // Match by _id
                  onChange={() => handleCategoryChange(category._id)}  // Handle filter by _id
                />
              </div>
            ))}
          </div>
        </AccordionBody>
      </Accordion>

      {/* Other filters (Price Range, Sort) remain the same */}
      {/* Price Range Filter */}
      <Accordion
        open={open === 2}
        icon={
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? 'rotate-180' : ''}`}
          />
        }
      >
        <ListItem className="p-0" selected={open === 2}>
          <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
            <ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Price Range
              </Typography>
            </ListItemPrefix>
          </AccordionHeader>
        </ListItem>
        <AccordionBody className="py-1">
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <div key={range}>
                <Checkbox
                  id={`price-${range}`}
                  label={range}
                  checked={filters.priceRange.includes(range)}
                  onChange={() => {
                    const newPriceRange = filters.priceRange.includes(range)
                      ? filters.priceRange.filter(r => r !== range)
                      : [...filters.priceRange, range];
                    handleFilterChange('priceRange', newPriceRange);
                  }}
                />
              </div>
            ))}
          </div>
        </AccordionBody>
      </Accordion>

      {/* Sort Filter */}
      <Accordion
        open={open === 3}
        icon={
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? 'rotate-180' : ''}`}
          />
        }
      >
        <ListItem className="p-0" selected={open === 3}>
          <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
            <ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Sort By
              </Typography>
            </ListItemPrefix>
          </AccordionHeader>
        </ListItem>
        <AccordionBody className="py-1">
          <div className="space-y-2">
            {sortOptions.map((option) => (
              <div key={option}>
                <Checkbox
                  id={option}
                  label={option.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  checked={filters.sortBy.includes(option)}
                  onChange={() => {
                    const newSortBy = filters.sortBy.includes(option)
                      ? filters.sortBy.filter(o => o !== option)
                      : [...filters.sortBy, option];
                    handleFilterChange('sortBy', newSortBy);
                  }}
                />
              </div>
            ))}
          </div>
        </AccordionBody>
      </Accordion>
    </List>
  );
}