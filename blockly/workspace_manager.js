/**
 * Manager for SomosChat Script Blockly Workspace
 * Handles initialization, event listeners, and code generation.
 */
class BlocklyWorkspaceManager {
    constructor(config) {
        this.containerId = config.containerId;
        this.xmlTextAreaId = config.xmlTextAreaId;
        this.jsTextAreaId = config.jsTextAreaId;
        this.toolboxPath = config.toolboxPath;
        this.buttons = config.buttons;
        this.modal = config.modal;

        this.workspace = null;
    }

    init() {
        fetch(this.toolboxPath)
            .then(response => response.text())
            .then(xmlText => {
                this.workspace = Blockly.inject(this.containerId, {
                    toolbox: xmlText
                });

                // Add listener after init
                this.workspace.addChangeListener((e) => this.updateCode(e));

                // Listen for manual XML changes
                const xmlTextArea = document.getElementById(this.xmlTextAreaId);
                if (xmlTextArea) {
                    xmlTextArea.addEventListener('input', () => {
                        const xmlText = xmlTextArea.value;
                        try {
                            const xml = Blockly.utils.xml.textToDom(xmlText);
                            this.workspace.clear();
                            Blockly.Xml.domToWorkspace(xml, this.workspace);
                        } catch (e) {
                            console.log('Invalid XML input yet');
                        }
                    });
                }

                // Initialize default block if empty
                if (this.workspace.getAllBlocks(false).length === 0) {
                    this.createMainBlock();
                }

                this.setupEventListeners();
                this.enableModal();
                this.setupContextMenu();

            })
            .catch(error => console.error('Error loading toolbox:', error));
    }

    createMainBlock() {
        const mainBlock = this.workspace.newBlock('sc_main');
        mainBlock.initSvg();
        mainBlock.render();
        mainBlock.moveBy(20, 20);
        mainBlock.setMovable(false);
        mainBlock.setDeletable(false);
        const date = new Date().toLocaleString();
        mainBlock.setCommentText('Versão: 1.0\nData: ' + date + '\nAutor: Usuário\n\n------------------------------\nHistórico de Mudanças:\n' + date + ' - Criação do Script.\n');
    }

    updateCode(event) {
        if (!this.workspace) return;

        // Re-create sc_main if deleted
        let mainBlock = this.workspace.getTopBlocks(false).find(b => b.type === 'sc_main');
        if (!mainBlock && (event.type === Blockly.Events.BLOCK_DELETE || event.type === Blockly.Events.FINISHED_LOADING)) {
            this.createMainBlock();
            return; // createMainBlock triggers events, so return to avoid loop issues/redundancy
        }

        // Snap main block
        if (mainBlock) {
            if (mainBlock.isMovable()) mainBlock.setMovable(false);
            if (event.type === Blockly.Events.BLOCK_MOVE && event.blockId === mainBlock.id) {
                const currentPos = mainBlock.getRelativeToSurfaceXY();
                if (currentPos.x !== 20 || currentPos.y !== 20) {
                    mainBlock.moveBy(20 - currentPos.x, 20 - currentPos.y);
                }
            }
        }

        // Generate JS
        let code = '';
        if (mainBlock) {
            javascript.javascriptGenerator.init(this.workspace);
            code = javascript.javascriptGenerator.blockToCode(mainBlock);
            if (Array.isArray(code)) code = code[0];
        } else {
            code = '# Bloco "Início do Script" não encontrado.\n';
        }

        const jsTextArea = document.getElementById(this.jsTextAreaId);
        if (jsTextArea) jsTextArea.value = code;

        // Generate XML
        const xmlTextArea = document.getElementById(this.xmlTextAreaId);
        if (xmlTextArea && document.activeElement !== xmlTextArea) {
            const xmlDom = Blockly.Xml.workspaceToDom(this.workspace);
            const xmlText = Blockly.Xml.domToPrettyText(xmlDom);
            xmlTextArea.value = xmlText;
        }
    }

    setupEventListeners() {
        // Update Vars
        const btnUpdate = document.getElementById(this.buttons.updateVarsId);
        if (btnUpdate) {
            btnUpdate.addEventListener('click', () => {
                if (typeof loadMocks === 'function') {
                    loadMocks(true);
                } else {
                    alert('Função loadMocks não encontrada.');
                }
            });
        }

        // Export
        const btnExport = document.getElementById(this.buttons.exportId);
        if (btnExport) {
            btnExport.addEventListener('click', () => this.exportProject());
        }

        // Import
        const btnImport = document.getElementById(this.buttons.importId);
        const fileInput = document.getElementById(this.buttons.fileInputId);
        if (btnImport && fileInput) {
            btnImport.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', (e) => this.importProject(e));
        }

        // View Code (Modal)
        const btnView = document.getElementById(this.buttons.viewCodeId);
        if (btnView) {
            btnView.addEventListener('click', () => this.openModal());
        }
    }

    exportProject() {
        const xmlDom = Blockly.Xml.workspaceToDom(this.workspace);
        const xmlText = Blockly.Xml.domToPrettyText(xmlDom);
        const blob = new Blob([xmlText], { type: 'text/xml' });
        const a = document.createElement('a');
        a.download = 'somoschat_project_' + new Date().getTime() + '.xml';
        a.href = URL.createObjectURL(blob);
        a.click();
        URL.revokeObjectURL(a.href);
    }

    importProject(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            const xmlText = e.target.result;
            try {
                const xml = Blockly.utils.xml.textToDom(xmlText);
                this.workspace.clear();
                Blockly.Xml.domToWorkspace(xml, this.workspace);

                // Update specific mocks if needed - reusing global SystemMocks logic if available
                if (typeof fetch === 'function' && typeof SystemMocks !== 'undefined') {
                    try {
                        const formsResponse = await fetch('mock_forms.json');
                        SystemMocks.forms = await formsResponse.json();
                        console.log('Mocks carregados após import:', SystemMocks);
                    } catch (err) {
                        console.warn('Erro ao atualizar mocks após import:', err);
                    }
                }

                alert('Projeto importado com sucesso!');
            } catch (err) {
                console.error('Erro ao importar:', err);
                alert('Erro ao importar projeto: ' + err);
            }
        };
        reader.readAsText(file);
        // Reset input to allow re-importing same file
        event.target.value = '';
    }

    enableModal() {
        const overlay = document.getElementById(this.modal.overlayId);
        if (!overlay) return;

        // Overlay click close
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.closeModal();
        });

        // Close buttons (X and button)
        if (this.modal.closeClass) {
            const closeBtns = overlay.querySelectorAll('.' + this.modal.closeClass);
            closeBtns.forEach(btn => btn.addEventListener('click', () => this.closeModal()));
        }

        // Copy button
        if (this.modal.copyClass) {
            const copyBtns = overlay.querySelectorAll('.' + this.modal.copyClass);
            copyBtns.forEach(btn => btn.addEventListener('click', () => this.copyCode()));
        }
    }

    openModal() {
        const code = document.getElementById(this.jsTextAreaId).value;
        const preview = document.getElementById(this.modal.contentId);
        if (preview) preview.value = code;

        const overlay = document.getElementById(this.modal.overlayId);
        if (overlay) overlay.style.display = 'flex';
    }

    closeModal() {
        const overlay = document.getElementById(this.modal.overlayId);
        if (overlay) overlay.style.display = 'none';
    }

    copyCode() {
        const preview = document.getElementById(this.modal.contentId);
        if (preview) {
            preview.select();
            document.execCommand('copy');
            alert('Código copiado para a área de transferência!');
        }
    }

    setupContextMenu() {
        if (typeof Blockly !== 'undefined') {
            const viewCodeOption = {
                displayText: 'Visualizar Script Gerado',
                preconditionFn: (scope) => 'enabled',
                callback: (scope) => {
                    this.openModal();
                },
                scopeType: Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
                id: 'show_generated_code',
                weight: 100,
            };

            // Check registry
            if (!Blockly.ContextMenuRegistry.registry.getItem('show_generated_code')) {
                Blockly.ContextMenuRegistry.registry.register(viewCodeOption);
            }
        }
    }
}
