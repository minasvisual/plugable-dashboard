<template>
<div class="mt-3">
<CTabs>
    <CTab title="Dashboard Configuration (Pre Build)" active>
        <DocsSettingsDashboard />
    </CTab>
    <CTab title="Project Json Configuration" active>
        <DocsSettingsProject />
    </CTab>
    <CTab title="Schema Json Configuration">
        <DocsSettingsSchema />
    </CTab>
    <CTab title="Widget Json Configuration">
        <DocsSettingsWidgets />
    </CTab>
</CTabs>
</div>
</template>

<script>
import DocsSettingsDashboard from './docs-settings-dashboard'
import DocsSettingsProject from './docs-settings-project'
import DocsSettingsSchema from './docs-settings-schema'
import DocsSettingsWidgets from './docs-settings-widget'
export default {
    components:{
        DocsSettingsDashboard,
        DocsSettingsProject,
        DocsSettingsSchema,
        DocsSettingsWidgets
    }
}
</script>