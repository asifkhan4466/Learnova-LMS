import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import { SearchIcon, FilterIcon, XIcon, StarIcon } from "../components/Icons";
import { coursesData } from "../data/coursesData";
import { platformCategories } from "../data/platformData";

export default function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");
  const [selectedLevel, setSelectedLevel] = useState(searchParams.get("level") || "All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync state if URL searchParams change
  useEffect(() => {
    const urlSearch = searchParams.get("search");
    const urlCategory = searchParams.get("category");
    const urlLevel = searchParams.get("level");

    if (urlSearch !== null) setSearchQuery(urlSearch);
    if (urlCategory !== null) setSelectedCategory(urlCategory);
    if (urlLevel !== null) setSelectedLevel(urlLevel);
  }, [searchParams]);

  // Handle Search Input Change and update URL
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    updateParam("search", val);
  };

  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (!value || value === "All") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    updateParam("category", cat);
  };

  const handleLevelSelect = (lvl) => {
    setSelectedLevel(lvl);
    updateParam("level", lvl);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedLevel("All");
    setSelectedRating("All");
    setSelectedPrice("All");
    setSortBy("popular");
    setSearchParams(new URLSearchParams());
  };

  // Filtered & Sorted Courses
  const filteredCourses = useMemo(() => {
    return coursesData
      .filter((course) => {
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = course.title.toLowerCase().includes(q);
          const matchSub = course.subtitle.toLowerCase().includes(q);
          const matchInstructor = course.instructor.name.toLowerCase().includes(q);
          const matchCategory = course.category.toLowerCase().includes(q);
          const matchSkills = course.skillsGained.some((s) => s.toLowerCase().includes(q));
          if (!matchTitle && !matchSub && !matchInstructor && !matchCategory && !matchSkills) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== "All" && course.category !== selectedCategory) {
          return false;
        }

        // Level filter
        if (selectedLevel !== "All" && course.level !== selectedLevel) {
          return false;
        }

        // Rating filter
        if (selectedRating === "4.8") {
          if (course.rating < 4.8) return false;
        } else if (selectedRating === "4.5") {
          if (course.rating < 4.5) return false;
        }

        // Price filter
        if (selectedPrice === "under60") {
          if (course.price >= 60) return false;
        } else if (selectedPrice === "60plus") {
          if (course.price < 60) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "popular") return b.students - a.students;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "priceAsc") return a.price - b.price;
        if (sortBy === "priceDesc") return b.price - a.price;
        return 0;
      });
  }, [searchQuery, selectedCategory, selectedLevel, selectedRating, selectedPrice, sortBy]);

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "All" ||
    selectedLevel !== "All" ||
    selectedRating !== "All" ||
    selectedPrice !== "All";

  return (
    <div className="courses-page">
      {/* COURSES HEADER */}
      <div className="courses-page-header">
        <div className="container">
          <div className="courses-header-content">
            <span className="courses-header-badge">CURATED TECH SPECIALIZATIONS</span>
            <h1 className="courses-header-title">Explore All Programs & Courses</h1>
            <p className="courses-header-subtitle">
              Learn industry-tested engineering, data, and design skills from leading practitioners.
            </p>

            {/* Courses Page Search Box */}
            <div className="courses-search-bar-wrap">
              <SearchIcon size={20} className="courses-search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by topic, instructor, or skill (e.g. AI, React, Docker)..."
                className="courses-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    updateParam("search", "");
                  }}
                  className="btn-clear-search"
                >
                  <XIcon size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN COURSES LAYOUT */}
      <div className="container courses-layout-container">
        {/* Mobile Filter Toggle */}
        <div className="mobile-filter-bar">
          <button
            type="button"
            className="btn-mobile-filter-toggle"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <FilterIcon size={18} />
            <span>Filters {hasActiveFilters && "(Active)"}</span>
          </button>
          <div className="mobile-sort-select">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="courses-layout-grid">
          {/* SIDEBAR FILTERS (Desktop & Mobile Drawer) */}
          <aside className={`courses-sidebar-filters ${mobileFiltersOpen ? "open" : ""}`}>
            <div className="filters-header">
              <h3 className="filters-title">
                <FilterIcon size={18} /> Filter Courses
              </h3>
              <div className="filters-header-actions">
                {hasActiveFilters && (
                  <button type="button" onClick={handleResetFilters} className="btn-reset-filters">
                    Reset
                  </button>
                )}
                <button
                  type="button"
                  className="btn-close-mobile-filters"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <XIcon size={20} />
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="filter-group">
              <h4 className="filter-group-title">Category</h4>
              <div className="filter-options-list">
                <label className="filter-radio-item">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === "All"}
                    onChange={() => handleCategorySelect("All")}
                  />
                  <span>All Categories</span>
                  <span className="filter-count">({coursesData.length})</span>
                </label>
                {platformCategories.map((cat) => {
                  const count = coursesData.filter((c) => c.category === cat.name).length;
                  return (
                    <label key={cat.id} className="filter-radio-item">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat.name}
                        onChange={() => handleCategorySelect(cat.name)}
                      />
                      <span>{cat.name}</span>
                      {count > 0 && <span className="filter-count">({count})</span>}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Level Filter */}
            <div className="filter-group">
              <h4 className="filter-group-title">Difficulty Level</h4>
              <div className="filter-options-list">
                {["All", "Beginner", "Intermediate", "Advanced"].map((lvl) => (
                  <label key={lvl} className="filter-radio-item">
                    <input
                      type="radio"
                      name="level"
                      checked={selectedLevel === lvl}
                      onChange={() => handleLevelSelect(lvl)}
                    />
                    <span>{lvl === "All" ? "All Levels" : lvl}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="filter-group">
              <h4 className="filter-group-title">Minimum Rating</h4>
              <div className="filter-options-list">
                <label className="filter-radio-item">
                  <input
                    type="radio"
                    name="rating"
                    checked={selectedRating === "All"}
                    onChange={() => setSelectedRating("All")}
                  />
                  <span>Any Rating</span>
                </label>
                <label className="filter-radio-item">
                  <input
                    type="radio"
                    name="rating"
                    checked={selectedRating === "4.8"}
                    onChange={() => setSelectedRating("4.8")}
                  />
                  <span className="rating-label-row">
                    4.8 & Above <StarIcon size={14} filled={true} />
                  </span>
                </label>
                <label className="filter-radio-item">
                  <input
                    type="radio"
                    name="rating"
                    checked={selectedRating === "4.5"}
                    onChange={() => setSelectedRating("4.5")}
                  />
                  <span className="rating-label-row">
                    4.5 & Above <StarIcon size={14} filled={true} />
                  </span>
                </label>
              </div>
            </div>

            {/* Price Filter */}
            <div className="filter-group">
              <h4 className="filter-group-title">Price Range</h4>
              <div className="filter-options-list">
                <label className="filter-radio-item">
                  <input
                    type="radio"
                    name="price"
                    checked={selectedPrice === "All"}
                    onChange={() => setSelectedPrice("All")}
                  />
                  <span>All Prices</span>
                </label>
                <label className="filter-radio-item">
                  <input
                    type="radio"
                    name="price"
                    checked={selectedPrice === "under60"}
                    onChange={() => setSelectedPrice("under60")}
                  />
                  <span>Under $60</span>
                </label>
                <label className="filter-radio-item">
                  <input
                    type="radio"
                    name="price"
                    checked={selectedPrice === "60plus"}
                    onChange={() => setSelectedPrice("60plus")}
                  />
                  <span>$60 & Above</span>
                </label>
              </div>
            </div>

            {mobileFiltersOpen && (
              <button
                type="button"
                className="btn-apply-mobile-filters"
                onClick={() => setMobileFiltersOpen(false)}
              >
                Apply Filters ({filteredCourses.length})
              </button>
            )}
          </aside>

          {/* MAIN RESULTS SECTION */}
          <main className="courses-main-results">
            {/* Control Bar: Count + Active Filter Tags + Sort */}
            <div className="courses-control-bar">
              <div className="results-count">
                Showing <strong>{filteredCourses.length}</strong> of{" "}
                <strong>{coursesData.length}</strong> courses
              </div>

              <div className="desktop-sort-wrapper">
                <label htmlFor="sort-select">Sort by:</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="courses-sort-dropdown"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Active Filter Chips */}
            {hasActiveFilters && (
              <div className="active-filter-chips">
                <span className="active-filters-label">Active Filters:</span>
                {searchQuery && (
                  <span className="filter-chip">
                    Search: "{searchQuery}"
                    <button type="button" onClick={() => { setSearchQuery(""); updateParam("search", ""); }}>×</button>
                  </span>
                )}
                {selectedCategory !== "All" && (
                  <span className="filter-chip">
                    Category: {selectedCategory}
                    <button type="button" onClick={() => handleCategorySelect("All")}>×</button>
                  </span>
                )}
                {selectedLevel !== "All" && (
                  <span className="filter-chip">
                    Level: {selectedLevel}
                    <button type="button" onClick={() => handleLevelSelect("All")}>×</button>
                  </span>
                )}
                {selectedRating !== "All" && (
                  <span className="filter-chip">
                    Rating: {selectedRating}+
                    <button type="button" onClick={() => setSelectedRating("All")}>×</button>
                  </span>
                )}
                {selectedPrice !== "All" && (
                  <span className="filter-chip">
                    Price: {selectedPrice === "under60" ? "Under $60" : "$60+"}
                    <button type="button" onClick={() => setSelectedPrice("All")}>×</button>
                  </span>
                )}
                <button type="button" onClick={handleResetFilters} className="clear-all-chips">
                  Clear All
                </button>
              </div>
            )}

            {/* Course Grid */}
            {filteredCourses.length > 0 ? (
              <div className="courses-grid-list">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="empty-courses-state">
                <div className="empty-state-icon">🔍</div>
                <h3>No courses found matching your criteria</h3>
                <p>Try resetting filters or searching for popular terms like "AI", "React", or "Kubernetes".</p>
                <button type="button" onClick={handleResetFilters} className="btn-empty-reset">
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
