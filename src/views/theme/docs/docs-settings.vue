<template>
<div>
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
</CTabs>
</div>
</template>

<script>
import DocsSettingsDashboard from './docs-settings-dashboard'
import DocsSettingsProject from './docs-settings-project'
import DocsSettingsSchema from './docs-settings-schema'
export default {
    components:{
        DocsSettingsDashboard,
        DocsSettingsProject,
        DocsSettingsSchema
    }
}
</script>