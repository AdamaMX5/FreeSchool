<script>
  import MenuView from './views/MenuView.svelte';
  import MainView from './views/MainView.svelte';
  import NavigationView from './views/NavigationView.svelte';
  import TeacherView from './views/TeacherView.svelte';

  let navCategory = $state(null);
  let currentCategory = $state(null);
  let currentPath = $state([]);
  let menuVisible = $state(true);


  function handleCategorySelected(selected) {
//    console.trace('handleCategorySelected wurde aufgerufen mit:', selected);

    if (selected === null) {
      // 🏠 Home geklickt
      currentCategory = null;
      navCategory = "__home__";
      currentPath = [];
    } else {
      // Kategorie ausgewählt
      currentCategory = selected;
      navCategory = selected;

      if (currentPath.includes(selected)) {
        currentPath = currentPath.slice(0, currentPath.indexOf(selected) + 1);
      } else {
        currentPath = [...currentPath, selected];
      }
    }
  }

  function handleNavigate(newPath) {
    if (JSON.stringify(newPath) === JSON.stringify(currentPath)) return; 

//    console.trace('handleNavigate wurde aufgerufen mit:', newPath);
    if (JSON.stringify(newPath) !== JSON.stringify(currentPath)) {
      currentPath = newPath;
      navCategory = newPath.length > 0 ? newPath[newPath.length - 1] : "__home__"; // Wenn der Pfad leer ist, setzen wir das "__home__"-Flag, damit das Menü wieder die Lernbüros lädt

      currentCategory = newPath.length > 0 ? newPath[newPath.length - 1] : null;
    }
  }

  function handleToggleMenu() {
    menuVisible = !menuVisible;
  }
</script>  

<!-- Navigationsleiste: fixiert oben -->
<NavigationView 
  {currentPath} 
  onNavigate={handleNavigate}
  onToggleMenu={handleToggleMenu}
/>

<!-- Menü: fixiert links, außerhalb des Content-Containers -->
<MenuView 
  {navCategory} 
  oncategorySelected={handleCategorySelected}
  {menuVisible}
/>

<!-- Content-Container: Nimmt immer die volle Breite ein -->
<MainView {currentCategory} {menuVisible} />

<style>
  :global(html, #app) {
    height: 100%;
  }

  :global(body) {
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #1e1e1e;
    overflow: hidden;
  }

</style>
