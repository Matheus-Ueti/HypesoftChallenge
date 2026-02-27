import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CategoryForm } from '@/components/forms/CategoryForm'

const onSubmit = vi.fn()
const onClose  = vi.fn()

const renderForm = () =>
  render(<CategoryForm onSubmit={onSubmit} onClose={onClose} />)

describe('CategoryForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza os campos Nome e Descrição', () => {
    renderForm()
    expect(screen.getByLabelText('Nome')).toBeInTheDocument()
    expect(screen.getByLabelText('Descrição (opcional)')).toBeInTheDocument()
  })

  it('exibe erro de validação ao submeter sem preencher o nome', async () => {
    renderForm()
    await userEvent.click(screen.getByRole('button', { name: /criar/i }))
    await waitFor(() => {
      expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument()
    })
  })

  it('chama onSubmit com os dados corretos ao preencher o formulário', async () => {
    renderForm()
    await userEvent.type(screen.getByLabelText('Nome'), 'Eletrônicos')
    await userEvent.type(screen.getByLabelText('Descrição (opcional)'), 'Dispositivos eletrônicos')
    await userEvent.click(screen.getByRole('button', { name: /criar/i }))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        { name: 'Eletrônicos', description: 'Dispositivos eletrônicos' },
        expect.anything(),
      )
    })
  })

  it('chama onClose ao clicar em Cancelar', async () => {
    renderForm()
    await userEvent.click(screen.getByRole('button', { name: /cancelar/i }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('exibe título "Editar Categoria" quando recebe defaultValues com id', () => {
    render(
      <CategoryForm
        defaultValues={{ id: '1', name: 'Vestuário', createdAt: '' }}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    )
    expect(screen.getByText('Editar Categoria')).toBeInTheDocument()
  })
})
