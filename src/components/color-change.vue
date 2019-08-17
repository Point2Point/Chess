<template>
  <div class="floating-theme-selector" v-bind:class="{ active: isActive }">
    <div class="floating-theme-selector-items">
      <md-list class="md-dense" md-expand :md-expanded.sync="isActive">
        <md-list-item @click="isActive = !isActive">
          <md-avatar class="md-small md-primary">
          </md-avatar>
          Active theme
        </md-list-item>
        <md-list-item @click="changeTheme('default')">
          <md-avatar class="md-small md-theme-light-blue">
          </md-avatar>
          <span class="md-list-item-text">Light</span>
        </md-list-item>
        <md-list-item @click="changeTheme('default-dark')">
          <md-avatar class="md-small md-theme-light-blue">
          </md-avatar>
          <span class="md-list-item-text">Dark</span>
        </md-list-item>
        <md-list-item @click="changeTheme('green-light')">
          <md-avatar class="md-small md-theme-light-green">
          </md-avatar>
          <span class="md-list-item-text">Light Green</span>
        </md-list-item>
        <md-list-item @click="changeTheme('green-dark')">
          <md-avatar class="md-small md-theme-light-green">
          </md-avatar>
          <span class="md-list-item-text">Dark Green</span>
        </md-list-item>
      </md-list>
    </div>
  </div>
</template>

<script>
    export default {
        name: "color-change",
      data: () => ({
        isActive: false,
      }),
      methods: {
        changeTheme: function (themeName) {
          this.$root.$material.theming.theme = themeName;
          this.isActive = !this.isActive
        }
      }
    }
</script>

<style scoped>
  .floating-theme-selector {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    max-height: 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: fixed;
    top: 50vh;
    right: 0;
    transform: translate3d(124px, -50%, 0px);
    will-change: border-radius, max-height, transform;
    overflow: hidden;
    border-radius: 20px 0px 0px 20px;
    transition: border-radius 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0s, max-height, transform;
  }

  .floating-theme-selector.active {
    max-height: 215px;
    transform: translate3d(0px, -50%, 0px);
    border-radius: 2px 0px 0px 2px;
  }

  .floating-theme-selector-items .md-list {
    border-bottom-left-radius: 2px;
    padding: 0;
  }

  .floating-theme-selector-items.md-list .md-list-item:first-child .md-list-item-content {
    padding-left: 8px;
  }

  .floating-theme-selector-items .md-list .md-list-item-content {
    justify-content: flex-start;
  }

  .floating-theme-selector.active .md-list .md-list-item:first-child .md-list-item-content {
    padding-left: 16px;
    font-weight: 700;
    border-bottom: 1px solid rgba(0, 0, 0, .12);
  }
  .md-theme-light-green {
    background: #64dd17;
  }
  .md-theme-light-blue {
    background: #448aff;
  }
</style>
