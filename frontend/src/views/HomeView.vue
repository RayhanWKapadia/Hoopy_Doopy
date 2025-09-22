<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
</script>

<template>
  <main>
  <DataTable tableStyle="min-width: 50rem">
    <Column field="code" header="Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
  </DataTable>
    
  </main>
</template>
