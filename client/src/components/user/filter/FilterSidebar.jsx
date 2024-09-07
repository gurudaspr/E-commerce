import React from 'react';
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
} from '@material-tailwind/react';
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';

export default function FilterSidebar() {
  const [open, setOpen] = React.useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <div className="relative">
      {/* Drawer button for small screens */}
      <div className="absolute -top-4 lg:hidden">
        <IconButton variant="text" size="lg" onClick={openDrawer}>
          {isDrawerOpen ? (
            <XMarkIcon className="h-8 w-8 stroke-2" />
          ) : (
            <AdjustmentsHorizontalIcon className="h-6 w-6" /> // Filter icon
          )}
        </IconButton>
      </div>

      {/* Drawer for small screens */}
      <Drawer open={isDrawerOpen} onClose={closeDrawer} className="lg:hidden">
        <Card color=" " shadow={false} className="h-full w-full p-4 bg-gray-300">
          <div className="mb-2 flex items-center gap-4 p-4">
            <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            />
            <Typography variant="h5" color="blue-gray">
              Filters
            </Typography>
          </div>

          <div className="p-2">
            <Input
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Search"
              variant="outlined"
            />
          </div>

          <FilterOptions open={open} handleOpen={handleOpen} />
        </Card>
      </Drawer>

      {/* Sidebar for large screens */}
      <div className="hidden fixed md:block lg:72  2xl:w-96 lg:h-full lg:p-4">
        <Card color="transparent" shadow={false} className="h-full p-4">
          <div className="mb-2 flex items-center gap-4 p-4">
            <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            />
            <Typography variant="h5" color="blue-gray">
              Filters
            </Typography>
          </div>

          <div className="p-2">
            <Input
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Search"
              variant="outlined"
            />
          </div>

          <FilterOptions open={open} handleOpen={handleOpen} />
        </Card>
      </div>
    </div>
  );
}

function FilterOptions({ open, handleOpen }) {
  const [selectedSortOption, setSelectedSortOption] = React.useState('');
  const [selectedCategories, setSelectedCategories] = React.useState([]);

  const handleSortChange = (option) => {
    setSelectedSortOption(option);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  return (
    <List>
      {/* Category Filter */}
      <Accordion
        open={open === 1}
        icon={
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`mx-auto h-4 w-4 transition-transform ${
              open === 1 ? 'rotate-180' : ''
            }`}
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
            <div>
              <Checkbox
                id="footwear"
                label="Footwear"
                checked={selectedCategories.includes('Footwear')}
                onChange={() => handleCategoryChange('Footwear')}
              />
            </div>
            <div>
              <Checkbox
                id="apparel"
                label="Apparel"
                checked={selectedCategories.includes('Apparel')}
                onChange={() => handleCategoryChange('Apparel')}
              />
            </div>
          </div>
        </AccordionBody>
      </Accordion>

      {/* Price Range Filter */}
      <Accordion
        open={open === 2}
        icon={
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`mx-auto h-4 w-4 transition-transform ${
              open === 2 ? 'rotate-180' : ''
            }`}
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
            <div>
              <Checkbox id="below-500" label="Below ₹500" />
            </div>
            <div>
              <Checkbox id="500-1000" label="₹501 to ₹1000" />
            </div>
            <div>
              <Checkbox id="1000-2000" label="₹1001 to ₹2000" />
            </div>
            <div>
              <Checkbox id="2000-5000" label="₹2001 to ₹5000" />
            </div>
            <div>
              <Checkbox id="above-5000" label="Above ₹5000" />
            </div>
          </div>
        </AccordionBody>
      </Accordion>

      {/* Sort Filter */}
      <Accordion
        open={open === 3}
        icon={
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`mx-auto h-4 w-4 transition-transform ${
              open === 3 ? 'rotate-180' : ''
            }`}
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
            <div>
              <Checkbox
                id="price-low-high"
                label="Price: Low to High"
                checked={selectedSortOption === 'price-low-high'}
                onChange={() => handleSortChange('price-low-high')}
              />
            </div>
            <div>
              <Checkbox
                id="price-high-low"
                label="Price: High to Low"
                checked={selectedSortOption === 'price-high-low'}
                onChange={() => handleSortChange('price-high-low')}
              />
            </div>
            <div>
              <Checkbox
                id="newest-first"
                label="Newest First"
                checked={selectedSortOption === 'newest-first'}
                onChange={() => handleSortChange('newest-first')}
              />
            </div>
            <div>
              <Checkbox
                id="best-rating"
                label="Best Rating"
                checked={selectedSortOption === 'best-rating'}
                onChange={() => handleSortChange('best-rating')}
              />
            </div>
          </div>
        </AccordionBody>
      </Accordion>
    </List>
  );
}
