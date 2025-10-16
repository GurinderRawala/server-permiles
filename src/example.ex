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
  greet/0 is a simple function.
  """
  def greet do
    IO.puts("Hello from Elixir")
    :ok
  end
end
