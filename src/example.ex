defmodule GreeterBehaviour do
  @moduledoc """
  GreeterBehaviour plays the role of an interface via callbacks.
  """
  @callback greet() :: :ok
end

defmodule Greeter do
  @moduledoc """
  Greeter is a test 'class' (module) with a moduledoc for coverage.
  """

  @behaviour GreeterBehaviour

  @doc """
  Prints a greeting message to standard output.
  
  Returns `:ok`.
  
  ## Examples
  
      iex> Greeter.greet()
      Hello from Elixir
      :ok
  
  """
  @spec greet() :: :ok
  def greet do
    IO.puts("Hello from Elixir")
    :ok
  end
end