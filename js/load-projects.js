document.addEventListener('DOMContentLoaded', function() {
    // Get the projects container
    const projectsGrid = document.getElementById('projects-grid');
    
    // Only run this code on the projects page
    if (!projectsGrid) return;
    
    // Show loading state
    projectsGrid.innerHTML = '<div class="col-span-3 text-center py-8"><div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div><p class="mt-4 text-gray-600">Loading projects...</p></div>';
    
    // Initialize Supabase client
    const supabaseUrl = 'https://grffvgtgvtcoiaegadap.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyZmZ2Z3RndnRjb2lhZWdhZGFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMjg0NTcsImV4cCI6MjA1OTYwNDQ1N30.DJtyW5sRugSeIy_m0PRRpxU86UAjcMjxBh0gTQbIT4k';
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
    
    // Function to fetch projects
    async function fetchProjects() {
      try {
        // Fetch projects from Supabase
        const { data: projects, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        // Clear the loading indicator
        projectsGrid.innerHTML = '';
        
        // If no projects found
        if (projects.length === 0) {
          projectsGrid.innerHTML = `
            <div class="col-span-3 text-center py-16">
              <div class="text-4xl text-gray-300 mb-4">
                <i class="fas fa-folder-open"></i>
              </div>
              <h3 class="text-2xl font-bold text-secondary mb-2">No projects found</h3>
              <p class="text-gray-600">Projects will appear here once added in the CMS.</p>
            </div>
          `;
          return;
        }
        
        // Create HTML for each project
        projects.forEach((project, index) => {
          const projectCard = `
            <div class="project-card bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full flex flex-col" data-aos="fade-up" data-aos-delay="${150 + (index * 50)}" data-category="${project.category}">
              <div class="h-64 overflow-hidden">
                <img src="${project.thumbnail}" alt="${project.title}" class="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110">
              </div>
              <div class="p-6 flex flex-col flex-grow">
                <div class="flex justify-between items-start mb-3">
                  <h3 class="text-xl font-bold text-secondary">${project.title}</h3>
                  <span class="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">${project.location}</span>
                </div>
                <p class="text-gray-600 mb-5">${project.description}</p>
                
                <!-- Project Highlights -->
                <div class="mb-5">
                  <h4 class="font-semibold text-secondary mb-2">Project Highlights:</h4>
                  <ul class="space-y-1 text-gray-600">
                    ${project.highlights.map(highlight => `
                      <li class="flex items-start">
                        <i class="fas fa-check text-primary mt-1 mr-2 text-sm"></i>
                        <span>${highlight}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>
                
                <!-- Gallery Preview -->
                ${project.gallery && project.gallery.length > 0 ? `
                  <div class="grid grid-cols-3 gap-2 mb-5 project-gallery" id="gallery-${index}">
                    <a href="${project.gallery[0].image}" class="col-span-2 row-span-2 gallery-item">
                      <img src="${project.gallery[0].image}" alt="${project.gallery[0].alt}" class="w-full h-32 object-cover rounded-md">
                    </a>
                    ${project.gallery.length > 1 ? `
                      <a href="${project.gallery[1].image}" class="gallery-item">
                        <img src="${project.gallery[1].image}" alt="${project.gallery[1].alt}" class="w-full h-[60px] object-cover rounded-md">
                      </a>
                    ` : ''}
                    ${project.gallery.length > 2 ? `
                      <a href="${project.gallery[2].image}" class="gallery-item">
                        <img src="${project.gallery[2].image}" alt="${project.gallery[2].alt}" class="w-full h-[60px] object-cover rounded-md">
                      </a>
                    ` : ''}
                  </div>
                ` : ''}
                
                <!-- View Project Button -->
                <button class="view-project-btn w-full py-2 border border-primary text-primary font-semibold rounded-md transition-all duration-300 hover:bg-primary hover:text-white flex items-center justify-center mt-auto" data-project-id="${project.id}">
                  <span>View Full Project</span>
                  <i class="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
          `;
          
          projectsGrid.innerHTML += projectCard;
        });
        
        // Initialize filter buttons
        initializeFilters();
        
        // Initialize light gallery if available
        if (typeof lightGallery === 'function') {
          document.querySelectorAll('.project-gallery').forEach(gallery => {
            lightGallery(gallery, {
              selector: '.gallery-item',
              plugins: [lgZoom, lgThumbnail],
              speed: 500,
              download: false
            });
          });
        }
        
        // Initialize project modals
        initializeProjectModals();
        
      } catch (error) {
        console.error('Error loading projects:', error);
        projectsGrid.innerHTML = `
          <div class="col-span-3 text-center py-16">
            <div class="text-4xl text-gray-300 mb-4">
              <i class="fas fa-exclamation-circle"></i>
            </div>
            <h3 class="text-2xl font-bold text-secondary mb-2">Error loading projects</h3>
            <p class="text-gray-600">Please try again later.</p>
          </div>
        `;
      }
    }
    
    // Load projects
    fetchProjects();
  });