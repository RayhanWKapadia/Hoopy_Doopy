<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
</script>

<template>
    <div class = "datatable">
      <DataTable showGridlines scrollable scrollHeight="70vh" responsiveLayout="scroll" tableStyle="min-width: 100rem">
        <Column field="Rk" header="Rk"></Column>
        <Column field="Player" header="Player"></Column>
        <Column field="Age" header="Age"></Column>
        <Column field="Team" header="Team"></Column>
        <Column field="Pos" header="Pos"></Column>
        <Column field="G" header="G"></Column>
        <Column field="GS" header="GS"></Column>
        <Column field="MP" header="MP"></Column>
        <Column field="FG" header="FG"></Column>
        <Column field="FGA" header="FGA"></Column>
        <Column field="FG%" header="FG%"></Column>
        <Column field="3P" header="3P"></Column>
        <Column field="3PA" header="3PA"></Column>
        <Column field="3P%" header="3P%"></Column>
        <Column field="2P" header="2P"></Column>
        <Column field="2PA" header="2PA"></Column>
        <Column field="2P%" header="2P%"></Column>
        <Column field="eFG%" header="eFG%"></Column>
        <Column field="FT" header="FT"></Column>
        <Column field="FTA" header="FTA"></Column>
        <Column field="FT%" header="FT%"></Column>
        <Column field="ORB" header="ORB"></Column>
        <Column field="DRB" header="DRB"></Column>
        <Column field="TRB" header="TRB"></Column>
        <Column field="AST" header="AST"></Column>
        <Column field="STL" header="STL"></Column>
        <Column field="BLK" header="BLK"></Column>
        <Column field="TOV" header="TOV"></Column>
        <Column field="PF" header="PF"></Column>
        <Column field="PTS" header="PTS"></Column>
        <Column field="Awards" header="Awards"></Column>
        <Column field="Player-additional" header="Player-additional"></Column>
      </DataTable>
    </div>
</template>

<style>

div.datatable {
  position: fixed;
  top:100px;
  left: 0;
  width: 100%;
  padding: 1rem;
}

</style>